import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-dot"></div>
        <h1>LeaseHub</h1>
      </div>

      <div className="topbar-right">
        <div className="user-chip">
          <span className="role-pill">{user?.role || "USER"}</span>
          <span className="user-email">{user?.email || "account@leasehub.com"}</span>
        </div>
        <button className="btn btn-outline" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;