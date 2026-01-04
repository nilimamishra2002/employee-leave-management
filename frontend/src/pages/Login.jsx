import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";



function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const toggleMode = () => {
  setIsLogin(!isLogin);
  setName("");
  setEmail("");
  setPassword("");
  setRole("employee");
  setError("");
};


const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    if (isLogin) {
      const res = await api.post("/auth/login", {
        email: email.trim(),
        password
      });

      res.data.user.role === "manager"
        ? navigate("/manager")
        : navigate("/employee");
    } else {
      await api.post("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password,
        role
      });

      // after successful register, go to login mode
      setIsLogin(true);
      setName("");
      setEmail("");
      setPassword("");
      setRole("employee");
    }
  } catch (err) {
    setError(
      err.response?.data?.message || "Registration failed"
    );
  }
};


  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </>
        )}

        <label>Email</label>
        <input
          type="email"
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

        {!isLogin && (
          <>
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
          </>
        )}

        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p>
        {isLogin ? "New user?" : "Already have an account?"}{" "}
        <span className="link" onClick={toggleMode}>
          {isLogin ? "Register" : "Login"}
        </span>
      </p>
    </div>
  );
}

export default Auth;
