import React, { useEffect, useState } from "react";
import api from "../axiosConfig";
import AddressAutocomplete from "./AddressAutocomplete";

const API_URL = "/api/properties/";

interface Property {
  id: number;
  address: string;
  description?: string;
}

const Dashboard: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);

  // Edit state
  const [editId, setEditId] = useState<number | null>(null);
  const [editAddress, setEditAddress] = useState("");
  const [editDescription, setEditDescription] = useState("");

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

  // ADD PROPERTY
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

  // DELETE PROPERTY
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;
    try {
      await api.delete(`${API_URL}${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to delete property.");
    }
  };

  // EDIT PROPERTY
  const startEdit = (property: Property) => {
    setEditId(property.id);
    setEditAddress(property.address);
    setEditDescription(property.description || "");
  };
  const cancelEdit = () => {
    setEditId(null);
    setEditAddress("");
    setEditDescription("");
  };
  const handleEditSave = async (id: number) => {
    try {
      await api.put(
        `${API_URL}${id}/`,
        { address: editAddress, description: editDescription },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setProperties((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, address: editAddress, description: editDescription }
            : p
        )
      );
      cancelEdit();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to update property.");
    }
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
              {properties.map((p) =>
                editId === p.id ? (
                  <div key={p.id} className="sp-property-card editing">
                    <input
                      className="sp-property-form-input"
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      style={{ marginBottom: 8 }}
                    />
                    <textarea
                      className="sp-property-form-input"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      style={{ minHeight: 36, marginBottom: 8 }}
                    />
                    <div className="sp-property-card-actions">
                      <button
                        className="sp-property-card-action-btn"
                        onClick={() => handleEditSave(p.id)}
                        title="Save"
                        style={{ color: "#31a354" }}
                      >
                        💾
                      </button>
                      <button
                        className="sp-property-card-action-btn"
                        onClick={cancelEdit}
                        title="Cancel"
                        style={{ color: "#c0392b" }}
                      >
                        ✖️
                      </button>
                    </div>
                  </div>
                ) : (
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
                        onClick={() => startEdit(p)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        className="sp-property-card-action-btn"
                        onClick={() => handleDelete(p.id)}
                        title="Delete"
                        style={{ color: "#c0392b" }}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                )
              )}
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
