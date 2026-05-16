import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Signup() {
  const { signup, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "TENANT",
  });
  const [error, setError] = useState("");

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await signup(form);

      if (user.role === "PROPERTY_OWNER") navigate("/owner");
      else if (user.role === "TENANT") navigate("/tenant");
      else if (user.role === "LEASE_MANAGER") navigate("/lease-manager");
      else if (user.role === "DISPUTE_MANAGER") navigate("/dispute-manager");
      else navigate("/");
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="muted">Join LeaseHub and start managing operations efficiently.</p>

        <form onSubmit={onSubmit} className="form">
          <label>Full Name</label>
          <input
            name="fullName"
            type="text"
            placeholder="Your name"
            value={form.fullName}
            onChange={onChange}
            required
          />

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
            placeholder="At least 6 characters"
            value={form.password}
            onChange={onChange}
            minLength={6}
            required
          />

          <label>Role</label>
          <select name="role" value={form.role} onChange={onChange}>
            <option value="TENANT">Tenant</option>
            <option value="PROPERTY_OWNER">Property Owner</option>
            <option value="LEASE_MANAGER">Lease Manager</option>
            <option value="DISPUTE_MANAGER">Dispute Manager</option>
          </select>

          <p className="muted" style={{ fontSize: "0.8rem", marginTop: "4px" }}>
            Admin accounts are created by system administrators only.
          </p>

          {error ? <p className="error">{error}</p> : null}

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Signup"}
          </button>
        </form>

        <p className="auth-foot">
          Already registered? <Link to="/login">Go to login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;