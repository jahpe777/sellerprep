// src/components/Dashboard.tsx
import React, { useEffect, useState } from "react";
import api from "../axiosConfig";
import AddressAutocomplete from "./AddressAutocomplete";
import DocumentsComponent from "./DocumentsComponent";

const API_URL = "/api/properties/";

interface Property {
  id: number;
  address: string;
  description?: string;
}

interface Topic {
  id: number;
  property: number;
  title: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [topics, setTopics] = useState<Record<number, Topic[]>>({});
  const [activeTopic, setActiveTopic] = useState<Record<number, number>>({});
  const [newTopicTitle, setNewTopicTitle] = useState<Record<number, string>>(
    {}
  );

  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showOverlay, setShowOverlay] = useState(false);

  const [editId, setEditId] = useState<number | null>(null);
  const [editAddress, setEditAddress] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line
  }, []);

  async function fetchProperties() {
    setError("");
    try {
      const res = await api.get(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      setProperties(res.data);
      // for each property, load its topics
      res.data.forEach((p: Property) => fetchTopics(p.id));
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to load properties.");
    }
  }

  async function fetchTopics(propertyId: number) {
    try {
      const res = await api.get("/api/topics/", {
        params: { property: propertyId },
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      setTopics((prev) => ({ ...prev, [propertyId]: res.data }));
      // if none active yet, default to first
      if (res.data.length && !activeTopic[propertyId]) {
        setActiveTopic((prev) => ({ ...prev, [propertyId]: res.data[0].id }));
      }
    } catch (err) {
      console.error("Could not load topics", err);
    }
  }

  async function handleAddTopic(propertyId: number) {
    const title = newTopicTitle[propertyId]?.trim();
    if (!title) return;
    try {
      await api.post(
        "/api/topics/",
        { property: propertyId, title },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setNewTopicTitle((prev) => ({ ...prev, [propertyId]: "" }));
      fetchTopics(propertyId);
    } catch (err) {
      console.error("Could not add topic", err);
    }
  }

  function handleAddressSelect(val: any) {
    setAddress(val.label || val.address || "");
  }

  async function handleSubmit(e: React.FormEvent) {
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
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;
    try {
      await api.delete(`${API_URL}${id}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to delete property.");
    }
  }

  function startEdit(p: Property) {
    setEditId(p.id);
    setEditAddress(p.address);
    setEditDescription(p.description || "");
  }

  function cancelEdit() {
    setEditId(null);
    setEditAddress("");
    setEditDescription("");
  }

  async function handleEditSave(id: number) {
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
  }

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
                    <div
                      className="sp-property-card-actions"
                      style={{ zIndex: 10 }}
                    >
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
                    <div
                      className="sp-property-card-actions"
                      style={{ zIndex: 10 }}
                    >
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

                    {/* 🔹 Topic Tabs */}
                    <div className="sp-tabs">
                      {(topics[p.id] || []).map((t) => (
                        <button
                          key={t.id}
                          className={`sp-tab-button ${
                            activeTopic[p.id] === t.id ? "active" : ""
                          }`}
                          onClick={() =>
                            setActiveTopic((prev) => ({
                              ...prev,
                              [p.id]: t.id,
                            }))
                          }
                        >
                          {t.title}
                        </button>
                      ))}
                      <input
                        className="sp-property-form-input"
                        placeholder="New section…"
                        value={newTopicTitle[p.id] || ""}
                        onChange={(e) =>
                          setNewTopicTitle((prev) => ({
                            ...prev,
                            [p.id]: e.target.value,
                          }))
                        }
                        style={{ width: "auto", marginLeft: 8 }}
                      />
                      <button
                        className="sp-property-btn"
                        onClick={() => handleAddTopic(p.id)}
                      >
                        + Add
                      </button>
                    </div>

                    {/* 🔹 Documents under the active topic */}
                    {activeTopic[p.id] && (
                      <div style={{ marginTop: 16 }}>
                        <div className="sp-tabs">
                          <button className="sp-tab-button active">
                            Documents
                          </button>
                        </div>
                        <div className="sp-tab-content">
                          <DocumentsComponent
                            propertyId={p.id}
                            topicId={activeTopic[p.id]}
                          />
                        </div>
                      </div>
                    )}
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
