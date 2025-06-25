import React, { useEffect, useState } from "react";
import api from "../axiosConfig";
import AddressAutocomplete from "./AddressAutocomplete";

const API_URL = "/api/properties/";

const Dashboard: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line
  }, []);

  const fetchProperties = async () => {
    setError("");
    try {
      const res = await api.get(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setProperties(res.data);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to load properties.");
    }
  };

  const handleAddressSelect = (val: any) => {
    setAddress(val.label || val.address || "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await api.post(
        API_URL,
        { address, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setAddress("");
      setDescription("");
      setSuccess("Property added!");
      setShowOverlay(true);
      setTimeout(() => {
        setShowOverlay(false);
        setSuccess("");
      }, 2200);
      await fetchProperties();
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          JSON.stringify(err.response?.data) ||
          "Failed to add property."
      );
    }
    setLoading(false);
  };

  return (
    <main className="sp-main-content">
      <div className="sp-content-card">
        <div className="sp-section-title">Your Properties</div>
        <div className="sp-properties-list">
          {properties.length === 0 ? (
            <div className="sp-properties-empty">
              No properties yet. Add your first below!
            </div>
          ) : (
            <div className="sp-property-cards-grid">
              {properties.map((p) => (
                <div key={p.id} className="sp-property-card">
                  <div className="sp-property-card-title">{p.address}</div>
                  {p.description && (
                    <div className="sp-property-card-description">
                      {p.description}
                    </div>
                  )}
                  <div className="sp-property-card-actions">
                    <button
                      className="sp-property-card-action-btn"
                      title="Edit (coming soon)"
                      disabled
                    >
                      ✏️
                    </button>
                    <button
                      className="sp-property-card-action-btn"
                      title="Delete (coming soon)"
                      disabled
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="sp-section-title">Add Property</div>
        <form className="sp-property-form" onSubmit={handleSubmit}>
          <label>Address</label>
          <AddressAutocomplete onSelect={handleAddressSelect} />
          <label>Description</label>
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="sp-property-btn"
            type="submit"
            disabled={loading || !address}
          >
            {loading ? "Adding..." : "Add Property"}
          </button>
          {error && <div className="sp-message">{error}</div>}
        </form>
      </div>

      {showOverlay && (
        <div className="sp-overlay">
          <div className="sp-overlay-message">Property added!</div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
