import { useState } from "react";
import axios from "axios";

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

  const API_BASE = "/api"; // adjust if needed

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
        setMessage("Login successful!");
        // Redirect logic goes here (e.g. navigate to /dashboard)
        window.location.href = "/dashboard";
      } catch (err) {
        setMessage("Login failed.");
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
      } catch (err) {
        setMessage("Registration failed.");
      }
    }
  };

  return (
    <div className="center-container">
      <div className="sp-login-card">
        <div className="sp-logo">SellerPrep</div>
        <div className="sp-login-title">{isLogin ? "Login" : "Register"}</div>
        <form className="sp-form" onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </>
          )}
          <button className="sp-btn" type="submit">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <button className="sp-link-btn" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Need to register?" : "Already have an account?"}
        </button>
        <div className="sp-message">{message}</div>
      </div>
    </div>
  );
}
