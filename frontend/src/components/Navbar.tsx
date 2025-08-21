import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../axiosConfig";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("access");
  const isDashboard = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/app/dashboard");
  const isAdmin = location.pathname.startsWith("/admin") || location.pathname.startsWith("/app/admin");
  const isAppRoute = location.pathname.startsWith("/app");
  const isComingSoon = location.pathname === "/";
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin when authenticated
    const checkAdminStatus = async () => {
      if (isAuthenticated) {
        try {
          // Use lightweight admin check endpoint
          const response = await api.get('/api/admin/check-status/');
          setUserIsAdmin(response.data.is_admin);
        } catch (error) {
          // Silently fail - user just isn't admin or not authenticated yet
          setUserIsAdmin(false);
        }
      } else {
        setUserIsAdmin(false);
      }
    };
    
    checkAdminStatus();
  }, [isAuthenticated]);

  function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  }

  return (
    <header className="sp-navbar">
      <Link to={isComingSoon ? "/" : "/app"} className="sp-logo sp-navbar-logo">
        SellerPrep
      </Link>

      {(isDashboard || isAdmin) && isAuthenticated ? (
        // Dashboard navigation for authenticated users
        <>
          <nav className="sp-navbar-title">
            <Link to={isAppRoute ? "/app/dashboard" : "/dashboard"}>Dashboard</Link>
            {userIsAdmin && (
              <Link to={isAppRoute ? "/app/admin" : "/admin"}>Admin Panel</Link>
            )}
          </nav>
          <button className="sp-navbar-btn" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : isComingSoon ? (
        // Coming soon page - minimal nav
        <>
          <nav className="sp-navbar-title">
            <a href="/app">View Demo</a>
          </nav>
          <div className="sp-navbar-auth">
            <a href="/app" className="sp-navbar-btn">
              Preview App
            </a>
          </div>
        </>
      ) : (
        // Full app landing page navigation
        <>
          <nav className="sp-navbar-title">
            <a href="#how-it-works">How It Works</a>
            <a href="#benefits">Benefits</a>
          </nav>
          <div className="sp-navbar-auth">
            <Link to="/app/login" className="sp-navbar-link">
              Sign In
            </Link>
            <Link to="/app/register" className="sp-navbar-btn">
              Get Started Free
            </Link>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
