import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./PrivateRoute";

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
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
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
