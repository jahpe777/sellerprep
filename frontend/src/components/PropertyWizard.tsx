// src/components/PropertyWizard.tsx
import React, { useState } from "react";
import AddressAutocomplete from "./AddressAutocomplete";

interface PropertyWizardProps {
  onSubmit: (address: string, description: string) => void;
  onCancel: () => void;
}

const WIZARD_STEPS = [
  {
    title: "Property Address",
    description: "Enter your property's address"
  },
  {
    title: "Property Description", 
    description: "Add a brief description (optional)"
  },
  {
    title: "Next Steps",
    description: "After creating your property, you'll be able to add sections"
  }
];

const PropertyWizard: React.FC<PropertyWizardProps> = ({ onSubmit, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const handleNext = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(address, description);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    if (currentStep === 0) return address.trim().length > 0;
    return true;
  };

  return (
    <div className="sp-wizard-overlay">
      <div className="sp-wizard-modal">
        <div className="sp-wizard-header">
          <h2 className="sp-wizard-title">Add New Property</h2>
          <button onClick={onCancel} className="sp-wizard-close">×</button>
        </div>

        <div className="sp-wizard-progress">
          {WIZARD_STEPS.map((_, index) => (
            <div
              key={index}
              className={`sp-wizard-step ${index <= currentStep ? 'active' : ''} ${index === currentStep ? 'current' : ''}`}
            >
              {index + 1}
            </div>
          ))}
        </div>

        <div className="sp-wizard-content">
          <h3 className="sp-wizard-step-title">{WIZARD_STEPS[currentStep].title}</h3>
          <p className="sp-wizard-step-desc">{WIZARD_STEPS[currentStep].description}</p>

          {currentStep === 0 && (
            <div className="sp-wizard-field">
              <label>Property Address</label>
              <AddressAutocomplete
                value={address}
                onChange={setAddress}
                placeholder="Enter property address..."
                onSelect={(data) => setAddress(data.address)}
              />
            </div>
          )}

          {currentStep === 1 && (
            <div className="sp-wizard-field">
              <label>Description (Optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the property..."
                className="sp-wizard-textarea"
                rows={3}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="sp-wizard-summary">
              <div className="sp-wizard-summary-item">
                <strong>Address:</strong> {address}
              </div>
              {description && (
                <div className="sp-wizard-summary-item">
                  <strong>Description:</strong> {description}
                </div>
              )}
              <div className="sp-wizard-info">
                After creating your property, you can organize information by adding sections like Kitchen, HVAC, Plumbing, etc.
              </div>
            </div>
          )}
        </div>

        <div className="sp-wizard-actions">
          <button
            onClick={onCancel}
            className="sp-wizard-btn sp-wizard-btn-secondary"
          >
            Cancel
          </button>
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="sp-wizard-btn sp-wizard-btn-secondary"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="sp-wizard-btn sp-wizard-btn-primary"
          >
            {currentStep === WIZARD_STEPS.length - 1 ? "Create Property" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyWizard;