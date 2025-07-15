import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface AuthResponse {
  access: string;
  refresh: string;
}

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const API_BASE = "/api"; // adjust if needed

  useEffect(() => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // LOGIN
      try {
        const res = await axios.post<AuthResponse>(`${API_BASE}/token/`, {
          username,
          password,
        });
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        setMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/dashboard"), 700);
      } catch (err: any) {
        setMessage(
          err.response?.data?.detail ||
            "Login failed. Please check your credentials."
        );
      }
    } else {
      // REGISTER
      try {
        await axios.post(`${API_BASE}/register/`, {
          username,
          password,
          email,
        });
        setMessage("Registration successful. You can now log in.");
        setIsLogin(true);
      } catch (err: any) {
        setMessage(
          err.response?.data?.error ||
            "Registration failed. Please check your input."
        );
      }
    }
  };

  return (
    <div className="sp-container">
      <div className="sp-title">SellerPrep</div>
      <h2 style={{ textAlign: "center", marginBottom: 18 }}>
        {isLogin ? "Login" : "Register"}
      </h2>
      <form className="sp-form" onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
            autoComplete="username"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
        </div>
        {!isLogin && (
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
        )}
        <button className="sp-btn" type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p
        className={`sp-message${
          message.includes("success") ? " sp-success" : ""
        }`}
      >
        {message}
      </p>
      <button className="sp-link-btn" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need to register?" : "Already have an account?"}
      </button>
    </div>
  );
}
