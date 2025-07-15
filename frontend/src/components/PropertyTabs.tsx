import React, { useState } from "react";

interface PropertyTabsProps {
  renderDocuments: () => React.ReactNode;
  renderImages: () => React.ReactNode;
  renderNotes: () => React.ReactNode;
}

const PropertyTabs: React.FC<PropertyTabsProps> = ({
  renderDocuments,
  renderImages,
  renderNotes,
}) => {
  const [activeTab, setActiveTab] = useState("documents");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "documents":
        return renderDocuments();
      case "images":
        return renderImages();
      case "notes":
        return renderNotes();
      default:
        return null;
    }
  };

  return (
    <div className="sp-property-tabs">
      <div className="sp-tabs">
        <button
          className={`sp-tab-button ${
            activeTab === "documents" ? "active" : ""
          }`}
          onClick={() => setActiveTab("documents")}
        >
          Documents
        </button>
        <button
          className={`sp-tab-button ${activeTab === "images" ? "active" : ""}`}
          onClick={() => setActiveTab("images")}
        >
          Images
        </button>
        <button
          className={`sp-tab-button ${activeTab === "notes" ? "active" : ""}`}
          onClick={() => setActiveTab("notes")}
        >
          Notes
        </button>
      </div>
      <div className="sp-tab-content">{renderActiveTab()}</div>
    </div>
  );
};

export default PropertyTabs;
