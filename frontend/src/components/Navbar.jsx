import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
  await api.post("/auth/logout");
  window.location.href = "/"; 
};


  return (
    <div style={{ textAlign: "right", marginBottom: "10px" }}>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;
