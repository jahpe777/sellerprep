// src/components/AddPropertyForm.tsx
import React, { useState } from "react";
import PropertyWizard from "./PropertyWizard";

interface Props {
  onSubmit: (address: string, description: string) => Promise<void>;
}

const AddPropertyForm: React.FC<Props> = ({ onSubmit }) => {
  const [showWizard, setShowWizard] = useState(false);

  const handleWizardSubmit = async (address: string, description: string) => {
    await onSubmit(address, description);
    setShowWizard(false);
  };

  return (
    <>
      <div className="sp-add-property-section">
        <button
          onClick={() => setShowWizard(true)}
          className="sp-add-property-btn"
        >
          + Add New Property
        </button>
        <p className="sp-add-property-hint">
          Create a new property to start organizing your home information
        </p>
      </div>

      {showWizard && (
        <PropertyWizard
          onSubmit={handleWizardSubmit}
          onCancel={() => setShowWizard(false)}
        />
      )}
    </>
  );
};

export default AddPropertyForm;
