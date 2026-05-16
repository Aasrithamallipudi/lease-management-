import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProperty } from "../../services/propertyService";

function AddProperty() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    address: "",
    rent: "",
    type: "Commercial",
    description: "",
  });

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      await createProperty({
        ...form,
        rent: Number(form.rent),
      });
      navigate("/owner");
    } catch (err) {
      setError(err.message || "Could not create property");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="form-wrap">
      <div className="page-head">
        <h2>Add Property</h2>
        <p className="muted">Create a new listing with clear rental details.</p>
      </div>

      <form className="card form" onSubmit={onSubmit}>
        <label>Title</label>
        <input name="title" value={form.title} onChange={onChange} required />

        <label>Address</label>
        <input name="address" value={form.address} onChange={onChange} required />

        <label>Monthly Rent</label>
        <input
          name="rent"
          type="number"
          min="0"
          value={form.rent}
          onChange={onChange}
          required
        />

        <label>Property Type</label>
        <select name="type" value={form.type} onChange={onChange}>
          <option value="Commercial">Commercial</option>
          <option value="Office">Office</option>
          <option value="Retail">Retail</option>
          <option value="Warehouse">Warehouse</option>
        </select>

        <label>Description</label>
        <textarea
          name="description"
          rows={4}
          value={form.description}
          onChange={onChange}
          placeholder="Highlights, amenities, nearby facilities..."
        />

        {error ? <p className="error">{error}</p> : null}

        <div className="row-gap">
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Create Property"}
          </button>
          <button className="btn btn-outline" type="button" onClick={() => navigate("/owner")}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddProperty;