import React from "react";
import Documents from "./Documents";
import Images from "./Images";
import Notes from "./Notes";

interface Props {
  propertyId: number;
  sectionId: number;
  activeTab: "documents" | "images" | "notes";
  onTabChange: (tab: "documents" | "images" | "notes") => void;
}

const ContentTabs: React.FC<Props> = ({
  propertyId,
  sectionId,
  activeTab,
  onTabChange,
}) => (
  <>
    <div className="sp-tabs">
      <button
        className={`sp-tab-button ${activeTab === "documents" ? "active" : ""}`}
        onClick={() => onTabChange("documents")}
      >
        Documents
      </button>
      <button
        className={`sp-tab-button ${activeTab === "images" ? "active" : ""}`}
        onClick={() => onTabChange("images")}
      >
        Images
      </button>
      <button
        className={`sp-tab-button ${activeTab === "notes" ? "active" : ""}`}
        onClick={() => onTabChange("notes")}
      >
        Notes
      </button>
    </div>

    <div className="sp-tab-content">
      {activeTab === "documents" ? (
        <Documents propertyId={propertyId} sectionId={sectionId} />
      ) : activeTab === "images" ? (
        <Images propertyId={propertyId} sectionId={sectionId} />
      ) : (
        <Notes propertyId={propertyId} sectionId={sectionId} />
      )}
    </div>
  </>
);

export default ContentTabs;
