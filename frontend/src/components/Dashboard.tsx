// src/components/Dashboard.tsx
import React, { useEffect, useState, KeyboardEvent } from "react";
import api from "../axiosConfig";
import AddressAutocomplete from "./AddressAutocomplete";
import Documents from "./Documents";

const API_URL = "/api/properties/";

interface Property {
  id: number;
  address: string;
  description?: string;
}

interface Section {
  id: number;
  property: number;
  title: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [sections, setSections] = useState<Record<number, Section[]>>({});
  const [activeSection, setActiveSection] = useState<Record<number, number>>(
    {}
  );
  const [isAddingSection, setIsAddingSection] = useState<
    Record<number, boolean>
  >({});
  const [newSectionTitle, setNewSectionTitle] = useState<
    Record<number, string>
  >({});

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
      res.data.forEach((p: Property) => fetchSections(p.id));
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to load properties.");
    }
  }

  async function fetchSections(propertyId: number) {
    try {
      const res = await api.get("/api/sections/", {
        params: { property: propertyId },
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      setSections((prev) => ({ ...prev, [propertyId]: res.data }));
      if (res.data.length && !activeSection[propertyId]) {
        setActiveSection((prev) => ({ ...prev, [propertyId]: res.data[0].id }));
      }
    } catch (err) {
      console.error("Could not load sections", err);
    }
  }

  async function handleAddSection(propertyId: number) {
    const title = newSectionTitle[propertyId]?.trim();
    if (!title) return;
    try {
      await api.post(
        "/api/sections/",
        { property: propertyId, title },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setNewSectionTitle((prev) => ({ ...prev, [propertyId]: "" }));
      setIsAddingSection((prev) => ({ ...prev, [propertyId]: false }));
      fetchSections(propertyId);
    } catch (err) {
      console.error("Could not add section", err);
    }
  }

  function onSectionKey(
    e: KeyboardEvent<HTMLInputElement>,
    propertyId: number
  ) {
    if (e.key === "Enter") handleAddSection(propertyId);
    if (e.key === "Escape")
      setIsAddingSection((prev) => ({ ...prev, [propertyId]: false }));
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
      setError(err.response?.data?.detail || "Failed to add property.");
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
                    <div className="sp-property-card-actions">
                      <button
                        className="sp-property-card-action-btn"
                        onClick={() => handleEditSave(p.id)}
                        title="Save"
                      >
                        💾
                      </button>
                      <button
                        className="sp-property-card-action-btn"
                        onClick={cancelEdit}
                        title="Cancel"
                      >
                        ✖️
                      </button>
                    </div>
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
                        style={{ color: "var(--sp-danger)" }}
                      >
                        🗑️
                      </button>
                    </div>

                    <div className="sp-tabs">
                      {(sections[p.id] || []).map((t) => (
                        <button
                          key={t.id}
                          className={`sp-tab-button ${
                            activeSection[p.id] === t.id ? "active" : ""
                          }`}
                          onClick={() =>
                            setActiveSection((prev) => ({
                              ...prev,
                              [p.id]: t.id,
                            }))
                          }
                        >
                          {t.title}
                        </button>
                      ))}
                      {isAddingSection[p.id] ? (
                        <input
                          className="sp-section-input"
                          autoFocus
                          placeholder="New section…"
                          value={newSectionTitle[p.id] || ""}
                          onChange={(e) =>
                            setNewSectionTitle((prev) => ({
                              ...prev,
                              [p.id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => onSectionKey(e, p.id)}
                          onBlur={() =>
                            setIsAddingSection((prev) => ({
                              ...prev,
                              [p.id]: false,
                            }))
                          }
                        />
                      ) : (
                        <button
                          className="sp-tab-add"
                          onClick={() =>
                            setIsAddingSection((prev) => ({
                              ...prev,
                              [p.id]: true,
                            }))
                          }
                        >
                          + Section
                        </button>
                      )}
                    </div>

                    {activeSection[p.id] && (
                      <div className="sp-docs-form">
                        <div className="sp-tabs">
                          <button className="sp-tab-button active">
                            Documents
                          </button>
                        </div>
                        <div className="sp-tab-content">
                          <Documents
                            propertyId={p.id}
                            sectionId={activeSection[p.id]}
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
            className="sp-property-form-input"
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
          <div className="sp-overlay-message">
            {success || "Property added!"}
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
