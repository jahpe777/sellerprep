import React, { useState } from "react";

export interface Section {
  id: number;
  property: number;
  name: string;
}

interface SectionTabsProps {
  propertyId: number;
  sections: Section[];
  activeSectionId: number | null;
  onSelectSection: (sectionId: number) => void;
  onAddSection: (name: string) => void;
}

const SectionTabs: React.FC<SectionTabsProps> = ({
  propertyId,
  sections,
  activeSectionId,
  onSelectSection,
  onAddSection,
}) => {
  const [newName, setNewName] = useState("");

  return (
    <div>
      <div className="sp-tabs">
        {sections.map((t) => (
          <button
            key={t.id}
            className={`sp-tab ${activeSectionId === t.id ? "active" : ""}`}
            onClick={() => onSelectSection(t.id)}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 8, marginBottom: 16 }}>
        <input
          type="text"
          placeholder="New tab name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="sp-property-form-input"
          style={{ width: "200px", marginRight: 8 }}
        />
        <button
          className="sp-property-btn"
          onClick={() => {
            if (newName.trim()) {
              onAddSection(newName.trim());
              setNewName("");
            }
          }}
        >
          + Add Tab
        </button>
      </div>
    </div>
  );
};

export default SectionTabs;
