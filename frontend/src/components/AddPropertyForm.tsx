// src/components/AddPropertyForm.tsx
import React, { useState } from "react";
import AddressAutocomplete from "./AddressAutocomplete";

interface Props {
  onSubmit: (address: string, description: string) => Promise<void>;
}

const AddPropertyForm: React.FC<Props> = ({ onSubmit }) => {
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!address) return;
    setLoading(true);
    await onSubmit(address, description);
    setAddress("");
    setDescription("");
    setLoading(false);
  }

  return (
    <>
      <div className="sp-section-title">Add Property</div>
      <form className="sp-property-form" onSubmit={handleSubmit}>
        <label>Address</label>
        <AddressAutocomplete onSelect={(data) => setAddress(data.address)} />

        <label>Description</label>
        <textarea
          className="sp-property-form-input"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          className="sp-property-btn"
          type="submit"
          disabled={loading || !address}
        >
          {loading ? "Adding..." : "Add Property"}
        </button>
      </form>
    </>
  );
};

export default AddPropertyForm;
