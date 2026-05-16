import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { getMyPayments } from "../../services/paymentService";

function PaymentHistory() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMyPayments();
        setRows(data);
      } catch (err) {
        setError(err.message || "Could not fetch payments");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <Loader text="Loading payment history..." />;

  return (
    <section>
      <div className="page-head">
        <h2>Payment History</h2>
        <p className="muted">Review your rent transactions and statuses.</p>
      </div>

      {error ? <p className="error">{error}</p> : null}

      <div className="card table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Method</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4}>No payment records found.</td>
              </tr>
            ) : (
              rows.map((item) => (
                <tr key={item.id}>
                  <td>{item.date || "-"}</td>
                  <td>Rs. {item.amount}</td>
                  <td>
                    <span className="badge">{item.status || "PENDING"}</span>
                  </td>
                  <td>{item.method || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default PaymentHistory;