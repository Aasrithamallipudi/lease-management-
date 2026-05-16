import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import AdminDashboard from "./pages/admin/AdminDashboard";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AddProperty from "./pages/owner/AddProperty";

import TenantDashboard from "./pages/tenant/TenantDashboard";
import LeaseRequest from "./pages/tenant/leaseRequest";
import PaymentHistory from "./pages/tenant/PaymentHistory";

import LeaseDashboard from "./pages/lease/LeaseDashboard";
import DisputeDashboard from "./pages/dispute/DisputeDashboard";

function DashboardLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="main-shell">
        <Sidebar />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function HomeRedirect() {
  const { user, token } = useContext(AuthContext);

  if (!token || !user) return <Navigate to="/login" replace />;

  if (user.role === "ADMIN") return <Navigate to="/admin" replace />;
  if (user.role === "PROPERTY_OWNER") return <Navigate to="/owner" replace />;
  if (user.role === "TENANT") return <Navigate to="/tenant" replace />;
  if (user.role === "LEASE_MANAGER") return <Navigate to="/lease-manager" replace />;
  if (user.role === "DISPUTE_MANAGER") return <Navigate to="/dispute-manager" replace />;

  return <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner"
            element={
              <ProtectedRoute allowedRoles={["PROPERTY_OWNER"]}>
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/add-property"
            element={
              <ProtectedRoute allowedRoles={["PROPERTY_OWNER"]}>
                <AddProperty />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tenant"
            element={
              <ProtectedRoute allowedRoles={["TENANT"]}>
                <TenantDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tenant/lease-request"
            element={
              <ProtectedRoute allowedRoles={["TENANT"]}>
                <LeaseRequest />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tenant/payments"
            element={
              <ProtectedRoute allowedRoles={["TENANT"]}>
                <PaymentHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lease-manager"
            element={
              <ProtectedRoute allowedRoles={["LEASE_MANAGER"]}>
                <LeaseDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dispute-manager"
            element={
              <ProtectedRoute allowedRoles={["DISPUTE_MANAGER"]}>
                <DisputeDashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>

      <Route
        path="/unauthorized"
        element={
          <div className="center-screen">
            <div className="card">
              <h2>Unauthorized</h2>
              <p>You do not have permission to access this page.</p>
            </div>
          </div>
        }
      />

      <Route
        path="*"
        element={
          <div className="center-screen">
            <div className="card">
              <h2>404</h2>
              <p>Page not found.</p>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;