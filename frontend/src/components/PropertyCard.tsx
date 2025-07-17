// src/components/PropertyCard.tsx
import React from "react";
import api from "../axiosConfig";
import type { Property } from "../types";
import SectionTabs from "./SectionTabs";
import ContentTabs from "./ContentTabs";
import EditPropertyForm from "./EditPropertyForm";

interface Props {
  property: Property;
  sections: any[];
  activeSectionId: number;
  activeContentTab: "documents" | "images" | "notes";
  onSectionChange: (sid: number) => void;
  onContentTabChange: (tab: "documents" | "images" | "notes") => void;
  onDelete: () => void;
  onEditStart: () => void;
  onEditSave: (address: string, description: string) => void;
  isEditing: boolean;
}

const PropertyCard: React.FC<Props> = ({
  property,
  sections,
  activeSectionId,
  activeContentTab,
  onSectionChange,
  onContentTabChange,
  onDelete,
  onEditStart,
  onEditSave,
  isEditing,
}) => {
  const handleExport = async () => {
    try {
      const res = await api.get(`/api/properties/${property.id}/export/`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      const blob = new Blob([res.data], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${property.address}.pdf`;
      link.click();
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  return (
    <div className={`sp-property-card${isEditing ? " editing" : ""}`}>
      {isEditing ? (
        <EditPropertyForm
          address={property.address}
          description={property.description || ""}
          onCancel={onEditStart}
          onSave={onEditSave}
        />
      ) : (
        <>
          <div className="sp-property-card-actions">
            <button
              className="sp-property-card-action-btn"
              onClick={onEditStart}
              title="Edit"
            >
              ✏️
            </button>
            <button
              className="sp-property-card-action-btn"
              onClick={handleExport}
              title="Export PDF"
            >
              📄
            </button>
            <button
              className="sp-property-card-action-btn"
              onClick={onDelete}
              title="Delete"
              style={{ color: "var(--sp-danger)" }}
            >
              🗑️
            </button>
          </div>

          <div className="sp-property-card-title">{property.address}</div>
          {property.description && (
            <div className="sp-property-card-description">
              {property.description}
            </div>
          )}

          <SectionTabs
            propertyId={property.id}
            sections={sections}
            activeSectionId={activeSectionId}
            onSelectSection={onSectionChange}
            onAddSection={() => {}}
          />

          {activeSectionId != null && (
            <div className="sp-docs-form">
              <ContentTabs
                propertyId={property.id}
                sectionId={activeSectionId}
                activeTab={activeContentTab}
                onTabChange={onContentTabChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PropertyCard;
