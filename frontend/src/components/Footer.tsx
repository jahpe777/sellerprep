// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => (
  <footer className="sp-footer">
    <div
      className="sp-content-card"
      style={{ padding: "20px 0", textAlign: "center" }}
    >
      © {new Date().getFullYear()} SellerPrep. All rights reserved.
    </div>
  </footer>
);

export default Footer;
