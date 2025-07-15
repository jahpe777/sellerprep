import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "../src/pages/AuthPage";
import Dashboard from "../src/pages/Dashboard";
import PrivateRoute from "./PrivateRoute";

export default function App() {
  return (
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
  );
}
