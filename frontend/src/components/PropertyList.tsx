import React, { useState } from "react";
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
  onLoadSections: (propertyId: number) => void;
  onAddSection: (propertyId: number, name: string) => void;
  sectionsLoaded: Record<number, boolean>;
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
  onLoadSections,
  onAddSection,
  sectionsLoaded,
}) => {
  // Start with all properties collapsed
  const [collapsedProperties, setCollapsedProperties] = useState<Record<number, boolean>>(
    properties.reduce((acc, p) => ({ ...acc, [p.id]: true }), {})
  );

  const toggleCollapse = (propertyId: number) => {
    const wasCollapsed = collapsedProperties[propertyId];
    setCollapsedProperties(prev => ({
      ...prev,
      [propertyId]: !prev[propertyId]
    }));
    
    // If expanding and sections haven't been loaded yet, load them
    if (wasCollapsed && !sectionsLoaded[propertyId]) {
      onLoadSections(propertyId);
    }
  };
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
          isCollapsed={collapsedProperties[p.id] || false}
          onToggleCollapse={() => toggleCollapse(p.id)}
          onAddSection={(name) => onAddSection(p.id, name)}
        />
      ))}
    </div>
  );
};

export default PropertyList;
