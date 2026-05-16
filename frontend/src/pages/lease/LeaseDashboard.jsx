function LeaseDashboard() {
  return (
    <section>
      <div className="page-head">
        <h2>Lease Manager Dashboard</h2>
        <p className="muted">Approve and monitor lease agreements in one place.</p>
      </div>

      <div className="card">
        <h3>Pending Approvals</h3>
        <p className="muted">You currently have 5 lease requests waiting for review.</p>
      </div>
    </section>
  );
}

export default LeaseDashboard;