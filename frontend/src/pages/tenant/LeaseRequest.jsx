import { useEffect, useState } from "react";
import { createLeaseRequest } from "../../services/leaseService";
import { getAvailableProperties } from "../../services/propertyService";

function LeaseRequest() {
  const [properties, setProperties] = useState([]);
  const [propertyId, setPropertyId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAvailableProperties();
        setProperties(data);
        if (data.length > 0) setPropertyId(String(data[0].id));
      } catch (err) {
        setError(err.message || "Could not load properties");
      }
    };
    load();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    try {
      await createLeaseRequest({ propertyId: Number(propertyId) });
      setMessage("Lease request submitted successfully.");
    } catch (err) {
      setError(err.message || "Lease request failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="form-wrap">
      <div className="page-head">
        <h2>Request Lease</h2>
        <p className="muted">Choose an available property and submit your request.</p>
      </div>

      <form className="card form" onSubmit={onSubmit}>
        <label>Available Properties</label>
        <select value={propertyId} onChange={(e) => setPropertyId(e.target.value)} required>
          {properties.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title} - {p.address} - Rs. {p.rent}
            </option>
          ))}
        </select>

        {error ? <p className="error">{error}</p> : null}
        {message ? <p className="success">{message}</p> : null}

        <button className="btn btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </section>
  );
}

export default LeaseRequest;