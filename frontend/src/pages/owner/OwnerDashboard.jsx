import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../../components/PropertyCard";
import Loader from "../../components/Loader";
import { getMyProperties } from "../../services/propertyService";

function OwnerDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMyProperties();
        setProperties(data);
      } catch (err) {
        setError(err.message || "Failed to load properties");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader text="Loading properties..." />;

  return (
    <section>
      <div className="page-head row-between">
        <div>
          <h2>Property Owner Dashboard</h2>
          <p className="muted">Manage listings and review lease activity.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/owner/add-property")}>
          Add Property
        </button>
      </div>

      {error ? <p className="error">{error}</p> : null}

      <div className="cards-grid">
        {properties.length === 0 ? (
          <div className="card">
            <p>No properties yet. Add your first listing.</p>
          </div>
        ) : (
          properties.map((p) => (
            <PropertyCard key={p.id} property={p} actionLabel="Manage" onAction={() => {}} />
          ))
        )}
      </div>
    </section>
  );
}

export default OwnerDashboard;