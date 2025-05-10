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
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <br />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isLogin && (
          <div>
            <label>Email:</label>
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <p>{message}</p>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Need to register?" : "Already have an account?"}
      </button>
    </div>
  );
}
