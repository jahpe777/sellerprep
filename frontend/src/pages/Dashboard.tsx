import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Property {
  id: number;
  address: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const token = localStorage.getItem("access");
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch properties when the component mounts
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    axios
      .get("/api/properties/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProperties(res.data))
      .catch(() => setError("Failed to load properties"))
      .finally(() => setLoading(false));
  }, [token]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "/api/properties/",
        { address, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProperties((props) => [...props, res.data]);
      setAddress("");
      setDescription("");
    } catch (err) {
      setError("Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    setError("");
    try {
      await axios.delete(`/api/properties/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties((props) => props.filter((p) => p.id !== id));
    } catch (err) {
      setError("Failed to delete property");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  if (!token)
    return (
      <div className="sp-container">
        <div className="sp-title">SellerPrep</div>
        <div className="sp-message">
          Please log in to access your dashboard.
        </div>
      </div>
    );

  return (
    <div className="sp-container">
      <div className="sp-title">SellerPrep</div>
      <div className="sp-dashboard-title">Dashboard</div>
      <div className="sp-dashboard-body">
        <button
          className="sp-btn"
          style={{ float: "right", width: "auto", marginBottom: 10 }}
          onClick={handleLogout}
        >
          Logout
        </button>
        <h3>Your Properties</h3>
        {loading && <div>Loading...</div>}
        {error && <div className="sp-message">{error}</div>}
        {properties.length === 0 && !loading && (
          <div style={{ marginBottom: 12, color: "#868e96" }}>
            No properties yet. Add your first below!
          </div>
        )}
        <div style={{ width: "100%" }}>
          {properties.map((prop) => (
            <div
              key={prop.id}
              style={{
                marginBottom: 16,
                borderBottom: "1px solid #eee",
                paddingBottom: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <strong>{prop.address}</strong>
                <div style={{ color: "#555", fontSize: "0.98rem" }}>
                  {prop.description}
                </div>
              </div>
              <button
                className="sp-btn"
                style={{
                  width: "auto",
                  background: "#c0392b",
                  padding: "6px 16px",
                  marginLeft: 16,
                  fontSize: "0.95rem",
                }}
                onClick={() => handleDelete(prop.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        <form
          className="sp-form"
          onSubmit={handleAdd}
          style={{ marginTop: 28 }}
        >
          <h4>Add Property</h4>
          <label>Address</label>
          <input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <label>Description</label>
          <input
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="sp-btn" type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Property"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
