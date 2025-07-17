// src/components/Dashboard.tsx
import React, { useEffect, useState } from "react";
import api from "../axiosConfig";
import type { Property, Section } from "../types";
import AddPropertyForm from "./AddPropertyForm";
import PropertyList from "./PropertyList";

const API_URL = "/api/properties/";

const Dashboard: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [sections, setSections] = useState<Record<number, Section[]>>({});
  const [activeSection, setActiveSection] = useState<Record<number, number>>(
    {}
  );
  const [activeContentTab, setActiveContentTab] = useState<
    Record<number, "documents" | "images" | "notes">
  >({});
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    setError("");
    try {
      const res = await api.get<Property[]>(API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      setProperties(res.data);
      res.data.forEach((p) => fetchSections(p.id));
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to load properties.");
    }
  }

  async function fetchSections(propertyId: number) {
    try {
      const res = await api.get<Section[]>("/api/sections/", {
        params: { property: propertyId },
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      setSections((prev) => ({ ...prev, [propertyId]: res.data }));
      if (res.data.length && !activeSection[propertyId]) {
        setActiveSection((prev) => ({
          ...prev,
          [propertyId]: res.data[0].id,
        }));
      }
    } catch (err) {
      console.error("Could not load sections", err);
    }
  }

  async function handleDelete(propertyId: number) {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;
    try {
      await api.delete(`${API_URL}${propertyId}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      setProperties((prev) => prev.filter((p) => p.id !== propertyId));
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to delete property.");
    }
  }

  function handleEditStart(propertyId: number) {
    setEditId(propertyId);
  }

  async function handleEditSave(
    propertyId: number,
    address: string,
    description: string
  ) {
    try {
      await api.put(
        `${API_URL}${propertyId}/`,
        { address, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      setProperties((prev) =>
        prev.map((p) =>
          p.id === propertyId ? { ...p, address, description } : p
        )
      );
      setEditId(null);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to update property.");
    }
  }

  async function handleAddProperty(address: string, description: string) {
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
      setSuccess("Property added!");
      await fetchProperties();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to add property.");
    }
  }

  return (
    <main className="sp-main-content">
      <div className="sp-content-card">
        {error && <div className="sp-message">{error}</div>}

        <PropertyList
          properties={properties}
          sections={sections}
          activeSection={activeSection}
          activeContentTab={activeContentTab}
          onSectionChange={(pid, sid) =>
            setActiveSection((prev) => ({ ...prev, [pid]: sid }))
          }
          onContentTabChange={(pid, tab) =>
            setActiveContentTab((prev) => ({ ...prev, [pid]: tab }))
          }
          onDelete={handleDelete}
          onEditStart={handleEditStart}
          onEditSave={handleEditSave}
          editId={editId}
        />

        <AddPropertyForm onSubmit={handleAddProperty} />
      </div>
    </main>
  );
};

export default Dashboard;
