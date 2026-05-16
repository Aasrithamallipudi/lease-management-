import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const { login, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await login(form);

      if (user.role === "ADMIN") navigate("/admin");
      else if (user.role === "PROPERTY_OWNER") navigate("/owner");
      else if (user.role === "TENANT") navigate("/tenant");
      else if (user.role === "LEASE_MANAGER") navigate("/lease-manager");
      else if (user.role === "DISPUTE_MANAGER") navigate("/dispute-manager");
      else navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="muted">Sign in to manage properties, leases, payments, and disputes.</p>

        <form onSubmit={onSubmit} className="form">
          <label>Email</label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={onChange}
            required
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={onChange}
            required
          />

          {error ? <p className="error">{error}</p> : null}

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="auth-foot">
          New here? <Link to="/signup">Create an account</Link>
        </p>

        <div className="demo-hint">
          <p style={{ fontSize: "0.75rem", color: "#888", marginTop: "12px" }}>
            Admin Login: <code>admin@leasehub.com</code> / <code>123456</code>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;