import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Sidebar() {
  const { user } = useContext(AuthContext);
  const role = user?.role;

  const links = [];

  if (role === "ADMIN") {
    links.push({ label: "Admin Dashboard", to: "/admin" });
  }
  if (role === "PROPERTY_OWNER") {
    links.push({ label: "Owner Dashboard", to: "/owner" });
    links.push({ label: "Add Property", to: "/owner/add-property" });
  }
  if (role === "TENANT") {
    links.push({ label: "Tenant Dashboard", to: "/tenant" });
    links.push({ label: "Lease Request", to: "/tenant/lease-request" });
    links.push({ label: "Payment History", to: "/tenant/payments" });
  }
  if (role === "LEASE_MANAGER") {
    links.push({ label: "Lease Dashboard", to: "/lease-manager" });
  }
  if (role === "DISPUTE_MANAGER") {
    links.push({ label: "Dispute Dashboard", to: "/dispute-manager" });
  }

  return (
    <aside className="sidebar">
      <p className="sidebar-title">Navigation</p>
      <nav className="sidebar-nav">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? "side-link active" : "side-link")}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;