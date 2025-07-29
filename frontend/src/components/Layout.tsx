// src/components/Layout.tsx
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Navbar />
    <main className="sp-main-content">
      <div className="sp-content-card">{children}</div>
    </main>
    <Footer />
  </>
);

export default Layout;
