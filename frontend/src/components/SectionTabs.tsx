// src/components/SectionTabs.tsx
import React, { useState } from "react";
import type { KeyboardEvent } from "react";

export interface Section {
  id: number;
  property: number;
  title: string;
  created_at: string;
}

interface SectionTabsProps {
  propertyId: number;
  sections: Section[];
  activeSectionId: number | null;
  onSelectSection: (sectionId: number) => void;
  onAddSection: (name: string) => void;
}

const SectionTabs: React.FC<SectionTabsProps> = ({
  sections,
  activeSectionId,
  onSelectSection,
  onAddSection,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && newName.trim()) {
      onAddSection(newName.trim());
      setNewName("");
      setIsAdding(false);
    }
    if (e.key === "Escape") {
      setNewName("");
      setIsAdding(false);
    }
  }

  return (
    <div className="sp-tabs">
      {sections.map((sec) => (
        <button
          key={sec.id}
          className={`sp-tab-button ${
            activeSectionId === sec.id ? "active" : ""
          }`}
          onClick={() => onSelectSection(sec.id)}
        >
          {sec.title}
        </button>
      ))}

      {isAdding ? (
        <input
          autoFocus
          placeholder="New section…"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={handleKey}
          onBlur={() => {
            setNewName("");
            setIsAdding(false);
          }}
          className="sp-tab-button sp-section-input"
        />
      ) : (
        <button className="sp-tab-button" onClick={() => setIsAdding(true)}>
          + Section
        </button>
      )}
    </div>
  );
};

export default SectionTabs;
