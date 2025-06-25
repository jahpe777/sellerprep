import React, { useState } from "react";
import api from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const API_BASE = "/api";

type AuthMode = "login" | "register";

// Helper to get a user-friendly error message
function getErrorMsg(err: any): string {
  if (err.response?.data?.detail) return err.response.data.detail;
  // Handle common field errors like {"username":["..."], "password":["..."]}
  if (err.response?.data && typeof err.response.data === "object") {
    const messages = Object.values(err.response.data)
      .map((msgArr) => (Array.isArray(msgArr) ? msgArr.join(" ") : msgArr))
      .join(" ");
    return messages;
  }
  return "An error occurred. Please try again.";
}

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"error" | "success" | "">("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    try {
      if (mode === "login") {
        const res = await api.post(`${API_BASE}/token/`, {
          username,
          password,
        });
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        setMessage("Login successful!");
        setMessageType("success");
        // Redirect to dashboard after a short delay for feedback
        setTimeout(() => navigate("/dashboard"), 600);
      } else {
        await api.post(`${API_BASE}/register/`, { username, password });
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
          <label>Username</label>
          <input
            type="text"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            setMode(mode === "login" ? "register" : "login");
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
