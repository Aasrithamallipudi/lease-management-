function TenantDashboard() {
  return (
    <section>
      <div className="page-head">
        <h2>Tenant Dashboard</h2>
        <p className="muted">Track lease requests, dues, and payment activity.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p>Active Lease</p>
          <h3>1</h3>
        </div>
        <div className="stat-card">
          <p>Pending Requests</p>
          <h3>2</h3>
        </div>
        <div className="stat-card">
          <p>Outstanding Dues</p>
          <h3>Rs. 0</h3>
        </div>
      </div>
    </section>
  );
}

export default TenantDashboard;