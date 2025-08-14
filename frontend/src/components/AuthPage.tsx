import React, { useState, useEffect } from "react";
import api from "../axiosConfig";
import { useNavigate, useLocation } from "react-router-dom";

const API_BASE = "/api";

type AuthMode = "login" | "register";

// Helper to get a detailed error message
function getErrorMsg(err: any): string {
  console.log("Login error details:", err.response?.data, "Status:", err.response?.status);
  
  if (err.response?.data?.detail) {
    return `Error: ${err.response.data.detail}`;
  }
  
  if (err.response?.data?.error) {
    return `Error: ${err.response.data.error}`;
  }
  
  // Handle common field errors like {"username":["..."], "password":["..."]}
  if (err.response?.data && typeof err.response.data === "object") {
    const messages = Object.entries(err.response.data)
      .map(([field, msgArr]) => {
        const msgs = Array.isArray(msgArr) ? msgArr.join(" ") : msgArr;
        return `${field}: ${msgs}`;
      })
      .join(", ");
    if (messages) return `Validation errors: ${messages}`;
  }
  
  if (err.response?.status === 401) {
    return "Login failed: Invalid email or password. Please check your credentials.";
  }
  
  if (err.response?.status === 400) {
    return "Bad request: Please check your input and try again.";
  }
  
  if (err.response?.status >= 500) {
    return "Server error: Please try again later.";
  }
  
  return `Connection error (${err.response?.status || 'network'}): Please check your connection and try again.`;
}

const AuthPage: React.FC = () => {
  const location = useLocation();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | "">("");
  const navigate = useNavigate();

  // Set mode based on current route
  useEffect(() => {
    if (location.pathname === "/register") {
      setMode("register");
    } else {
      setMode("login");
    }
  }, [location.pathname]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    try {
      if (mode === "login") {
        const res = await api.post(`${API_BASE}/token/`, {
          username: email,  // Send email as username for JWT
          password,
        });
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        setMessage("Login successful!");
        setMessageType("success");
        // Redirect to dashboard after a short delay for feedback
        setTimeout(() => navigate("/dashboard"), 600);
      } else {
        await api.post(`${API_BASE}/register/`, { email, password });
        setMessage("Registration successful! You can now log in.");
        setMessageType("success");
        setMode("login");
      }
    } catch (err: any) {
      setMessage(getErrorMsg(err));
      setMessageType("error");
    }
  };

  return (
    <div className="center-container">
      <div className="sp-login-card">
        <div className="sp-logo">SellerPrep</div>
        <div className="sp-login-title">
          {mode === "login" ? "Log In" : "Sign Up"}
        </div>
        <form className="sp-form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="sp-btn" type="submit">
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>
        <button
          className="sp-link-btn"
          onClick={() => {
            navigate(mode === "login" ? "/register" : "/login");
            setMessage("");
            setMessageType("");
          }}
        >
          {mode === "login"
            ? "Don't have an account? Sign up"
            : "Already have an account? Log in"}
        </button>
        {message && (
          <div
            className={`sp-message ${
              messageType === "success" ? "sp-message-success" : ""
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
