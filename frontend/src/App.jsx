import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth routes */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/auth" element={<Auth />} />

      {/* Dashboards */}
      <Route path="/employee" element={<EmployeeDashboard />} />
      <Route path="/manager" element={<ManagerDashboard />} />
    </Routes>
  );
}

export default App;
