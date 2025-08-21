// src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import ComingSoon from "./components/ComingSoon";
import AdminPanel from "./components/AdminPanel";
import PrivateRoute from "./PrivateRoute";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    const handler = () => setSessionExpired(true);
    window.addEventListener("sessionExpired", handler);
    return () => window.removeEventListener("sessionExpired", handler);
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* Preview Site - Coming Soon */}
          <Route path="/" element={<ComingSoon />} />
          
          {/* Beta Application Routes */}
          <Route path="/beta" element={<LandingPage />} />
          <Route path="/beta/login" element={<AuthPage />} />
          <Route path="/beta/register" element={<AuthPage />} />
          
          {/* Protected Routes */}
          <Route
            path="/beta/dashboard/*"
            element={
              <PrivateRoute>
                <main className="sp-main-content">
                  <div className="sp-content-card">
                    <Dashboard />
                  </div>
                </main>
              </PrivateRoute>
            }
          />
          <Route
            path="/beta/admin"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />
          
          {/* Legacy Routes - Keep for backward compatibility */}
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <main className="sp-main-content">
                  <div className="sp-content-card">
                    <Dashboard />
                  </div>
                </main>
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>

      {sessionExpired && (
        <div className="sp-overlay">
          <div className="sp-overlay-message error">
            Session expired. Please log in again.
          </div>
        </div>
      )}
    </>
  );
}
