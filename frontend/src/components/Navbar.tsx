import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("access");
  const isDashboard = location.pathname.startsWith("/dashboard");

  function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  }

  return (
    <header className="sp-navbar">
      <Link to="/" className="sp-logo sp-navbar-logo">
        SellerPrep
      </Link>

      {isDashboard && isAuthenticated ? (
        // Dashboard navigation for authenticated users
        <>
          <nav className="sp-navbar-title">
            <Link to="/dashboard">Dashboard</Link>
          </nav>
          <button className="sp-navbar-btn" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        // Landing page navigation for unauthenticated users
        <>
          <nav className="sp-navbar-title">
            <a href="#how-it-works">How It Works</a>
            <a href="#benefits">Benefits</a>
          </nav>
          <div className="sp-navbar-auth">
            <Link to="/login" className="sp-navbar-link">
              Sign In
            </Link>
            <Link to="/register" className="sp-navbar-btn">
              Get Started Free
            </Link>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
