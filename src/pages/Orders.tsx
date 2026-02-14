import { getCurrentUser } from '../services/auth';
import { listOrders } from '../services/orders';
import { formatINR } from '../utils/currency';

export default function Orders() {
  const user = getCurrentUser();
  const orders = user ? listOrders(user.email) : [];

  return (
    <section>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="grid">
          {orders.map(o => (
            <div key={o.id} className="card order-card">
              <h3>{o.itemTitle}</h3>
              {o.status && <p><strong>Status:</strong> {o.status.toUpperCase()}</p>}
              <p className="price">{formatINR(o.price)} × {o.quantity}</p>
              <p>Ordered on {new Date(o.date).toLocaleString()}</p>
              <p>Ship to: {o.address}</p>
              {o.method && (
                <p>Payment: {o.method.toUpperCase()} {o.last4 ? `• • • • ${o.last4}` : ''}</p>
              )}
              {o.paymentId && <p>Payment ID: {o.paymentId}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
