import React from "react";
import type { Property, Section } from "../types";
import PropertyCard from "./PropertyCard";

// Include notes alongside documents and images
type ContentTab = "documents" | "images" | "notes";

interface Props {
  properties: Property[];
  sections: Record<number, Section[]>;
  activeSection: Record<number, number>;
  activeContentTab: Record<number, ContentTab>;
  onSectionChange: (pid: number, sid: number) => void;
  onContentTabChange: (pid: number, tab: ContentTab) => void;
  onDelete: (pid: number) => void;
  onEditStart: (pid: number) => void;
  onEditSave: (pid: number, address: string, description: string) => void;
  editId: number | null;
}

const PropertyList: React.FC<Props> = ({
  properties,
  sections,
  activeSection,
  activeContentTab,
  onSectionChange,
  onContentTabChange,
  onDelete,
  onEditStart,
  onEditSave,
  editId,
}) => {
  if (properties.length === 0) {
    return (
      <div className="sp-properties-empty">
        No properties yet. Add one below!
      </div>
    );
  }

  return (
    <div className="sp-property-cards-grid">
      {properties.map((p) => (
        <PropertyCard
          key={p.id}
          property={p}
          sections={sections[p.id] || []}
          activeSectionId={activeSection[p.id]}
          activeContentTab={activeContentTab[p.id] || "documents"}
          onSectionChange={(sid) => onSectionChange(p.id, sid)}
          onContentTabChange={(tab) => onContentTabChange(p.id, tab)}
          onDelete={() => onDelete(p.id)}
          onEditStart={() => onEditStart(p.id)}
          onEditSave={(addr, desc) => onEditSave(p.id, addr, desc)}
          isEditing={editId === p.id}
        />
      ))}
    </div>
  );
};

export default PropertyList;
