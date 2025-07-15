import { useEffect, useState } from "react";

export default function Dashboard() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      setUsername(null);
      return;
    }

    // Optionally fetch user info from backend if you add a /me/ endpoint later
    setUsername("Current user"); // Placeholder
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {username ? (
        <p>Welcome, {username}!</p>
      ) : (
        <p>Please log in to see your projects.</p>
      )}
    </div>
  );
}
