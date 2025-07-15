import React, { useState } from "react";
import AddressAutocomplete from "../components/AddressAutocomplete";

const Dashboard: React.FC = () => {
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const handleAddressSelect = (data: { address: string }) => {
    setAddress(data.address);
    // Optionally: use data.lat, data.lng, or data.details here too
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send to API and refresh property list
    setAddress("");
    setDescription("");
  };

  // Replace with your real data/handlers!
  const properties: { address: string; description: string }[] = [];

  return (
    <>
      <div className="sp-navbar">
        <div className="sp-navbar-title">Dashboard</div>
        <div className="sp-navbar-logo">SellerPrep</div>
        <div className="sp-navbar-logout">
          <button className="sp-navbar-btn">Logout</button>
        </div>
      </div>

      <main className="sp-main-content">
        <div className="sp-content-card">
          <div className="sp-section-title">Your Properties</div>
          <div className="sp-properties-list">
            {properties.length === 0 ? (
              <div className="sp-properties-empty">
                No properties yet. Add your first below!
              </div>
            ) : (
              <ul>
                {properties.map((p, i) => (
                  <li key={i}>
                    <strong>{p.address}</strong> <br />
                    {p.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="sp-section-title">Add Property</div>
          <form className="sp-property-form" onSubmit={handleSubmit}>
            <label>Address</label>
            <AddressAutocomplete onSelect={handleAddressSelect} />
            <label>Description</label>
            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className="sp-property-btn" type="submit">
              Add Property
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
