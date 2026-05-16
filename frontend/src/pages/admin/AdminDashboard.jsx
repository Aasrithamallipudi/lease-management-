function AdminDashboard() {
  const stats = [
    { label: "Users", value: 124 },
    { label: "Properties", value: 89 },
    { label: "Leases", value: 64 },
    { label: "Payments", value: 392 },
    { label: "Disputes", value: 8 },
  ];

  return (
    <section>
      <div className="page-head">
        <h2>Admin Dashboard</h2>
        <p className="muted">Platform-wide operations and summary metrics.</p>
      </div>

      <div className="stats-grid">
        {stats.map((item) => (
          <div key={item.label} className="stat-card">
            <p>{item.label}</p>
            <h3>{item.value}</h3>
          </div>
        ))}
      </div>

      <div className="card mt-16">
        <h3>System Health</h3>
        <p className="muted">
          All core services are operational. No critical incidents reported.
        </p>
      </div>
    </section>
  );
}

export default AdminDashboard;