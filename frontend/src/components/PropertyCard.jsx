function PropertyCard({ property, onAction, actionLabel = "View" }) {
  return (
    <article className="card property-card">
      <div className="card-header">
        <h3>{property.title}</h3>
        <span className="badge">{property.status || "Available"}</span>
      </div>

      <p className="muted">{property.address}</p>

      <div className="grid-2">
        <div>
          <p className="label">Monthly Rent</p>
          <p className="value">Rs. {property.rent}</p>
        </div>
        <div>
          <p className="label">Type</p>
          <p className="value">{property.type || "Commercial"}</p>
        </div>
      </div>

      {onAction ? (
        <button className="btn btn-primary mt-12" onClick={() => onAction(property)}>
          {actionLabel}
        </button>
      ) : null}
    </article>
  );
}

export default PropertyCard;