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
          password,
        });

        res.data.user.role === "manager"
          ? navigate("/manager")
          : navigate("/employee");
      } else {
        await api.post("/auth/register", {
          name: name.trim(),
          email: email.trim(),
          password,
          role,
        });

        // after successful register, go to login mode
        setIsLogin(true);
        setName("");
        setEmail("");
        setPassword("");
        setRole("employee");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-wrapper">
        {/* LEFT BRAND PANEL */}
        <div className="auth-info d-none d-md-block">
          <h2>Employee Leave Management</h2>
          <p>
            A secure platform to apply, approve, and track employee leave
            efficiently.
          </p>

          <ul className="mt-4">
            <li>✔ Role-based access</li>
            <li>✔ Leave balance tracking</li>
            <li>✔ Manager approvals</li>
          </ul>
        </div>

        <div className="auth-container">
          <h3 className="text-center mb-4">{isLogin ? "Login" : "Register"}</h3>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {!isLogin && (
              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            {isLogin ? "New user?" : "Already have an account?"}{" "}
            <span className="link" onClick={toggleMode}>
              {isLogin ? "Register" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
