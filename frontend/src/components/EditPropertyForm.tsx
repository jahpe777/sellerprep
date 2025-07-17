// src/components/EditPropertyForm.tsx
import React, { useState } from "react";

interface Props {
  address: string;
  description: string;
  onCancel: () => void;
  onSave: (address: string, description: string) => void;
}

const EditPropertyForm: React.FC<Props> = ({
  address,
  description,
  onCancel,
  onSave,
}) => {
  const [addr, setAddr] = useState(address);
  const [desc, setDesc] = useState(description);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(addr, desc);
  }

  return (
    <form className="sp-property-form" onSubmit={handleSubmit}>
      <input
        value={addr}
        onChange={(e) => setAddr(e.target.value)}
        className="sp-property-form-input"
      />
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="sp-property-form-input"
      />
      <button className="sp-property-btn" type="submit">
        Save
      </button>
      <button className="sp-property-btn" type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditPropertyForm;
