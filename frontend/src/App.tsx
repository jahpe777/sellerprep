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
          
          {/* Full Application Routes */}
          <Route path="/app" element={<LandingPage />} />
          <Route path="/app/login" element={<AuthPage />} />
          <Route path="/app/register" element={<AuthPage />} />
          
          {/* Protected Routes */}
          <Route
            path="/app/dashboard/*"
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
            path="/app/admin"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />
          
          {/* Legacy Routes - Redirect to /app */}
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
