// src/components/PropertyCard.tsx
import React, { useState } from "react";
import api from "../axiosConfig";
import type { Property } from "../types";
import SectionTabs from "./SectionTabs";
import ContentTabs from "./ContentTabs";
import EditPropertyForm from "./EditPropertyForm";
import SectionGuide from "./SectionGuide";
import PaymentModal from "./PaymentModal";

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
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onAddSection: (name: string) => void;
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
  isCollapsed,
  onToggleCollapse,
  onAddSection,
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleExport = async () => {
    try {
      const res = await api.get(`/properties/${property.id}/export/`, {
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
    } catch (err: any) {
      // Check if payment is required (HTTP 402)
      if (err.response?.status === 402) {
        setShowPaymentModal(true);
      } else {
        console.error("Export failed", err);
        alert("Export failed. Please try again.");
      }
    }
  };

  const handlePaymentSuccess = () => {
    // After successful payment, try export again
    handleExport();
  };

  return (
    <div className={`sp-property-card${isEditing ? " editing" : ""}${isCollapsed ? " collapsed" : ""}`}>
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

          <div className="sp-property-card-title" onClick={onToggleCollapse}>
            <span className="sp-collapse-icon">▼</span>
            <span>{property.address}</span>
          </div>
          
          <div className="sp-property-content">
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
              onAddSection={onAddSection}
            />

            {sections.length === 0 && (
              <SectionGuide onAddSection={onAddSection} />
            )}

            {activeSectionId != null && sections.length > 0 && (
              <div className="sp-content-area">
                <ContentTabs
                  propertyId={property.id}
                  sectionId={activeSectionId}
                  activeTab={activeContentTab}
                  onTabChange={onContentTabChange}
                />
              </div>
            )}
          </div>
        </>
      )}
      
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        propertyId={property.id}
        propertyAddress={property.address}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default PropertyCard;
