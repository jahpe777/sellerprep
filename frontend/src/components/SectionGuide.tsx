// src/components/SectionGuide.tsx
import React from "react";

interface SectionGuideProps {
  onAddSection: (name: string) => void;
}

const RECOMMENDED_SECTIONS = [
  {
    name: "Kitchen",
    description: "Appliances, cabinets, countertops, repairs, renovations"
  },
  {
    name: "Bathrooms", 
    description: "Fixtures, plumbing, tiles, vanities, renovations"
  },
  {
    name: "HVAC",
    description: "Heating, cooling, ductwork, maintenance records"
  },
  {
    name: "Electrical",
    description: "Panel, wiring, outlets, lighting, safety inspections"
  },
  {
    name: "Plumbing",
    description: "Pipes, water heater, fixtures, repairs, inspections"
  },
  {
    name: "Roofing",
    description: "Roof condition, repairs, gutters, maintenance"
  },
  {
    name: "Flooring",
    description: "Hardwood, carpet, tile installations and repairs"
  },
  {
    name: "Exterior",
    description: "Siding, paint, windows, doors, landscaping"
  }
];

const SectionGuide: React.FC<SectionGuideProps> = ({ onAddSection }) => {
  return (
    <div className="sp-section-guide">
      <h4 className="sp-section-guide-title">Recommended Sections</h4>
      <p className="sp-section-guide-subtitle">
        Click to add common property sections:
      </p>
      <div className="sp-section-guide-grid">
        {RECOMMENDED_SECTIONS.map((section) => (
          <button
            key={section.name}
            className="sp-section-guide-item"
            onClick={() => onAddSection(section.name)}
          >
            <div className="sp-section-guide-name">{section.name}</div>
            <div className="sp-section-guide-desc">{section.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SectionGuide;