import { useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getOrderById } from '../services/orders';
import { formatINR } from '../utils/currency';

export default function Receipt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = useMemo(() => (id ? getOrderById(id) : null), [id]);

  if (!order) {
    return (
      <section className="card">
        <h2>Receipt</h2>
        <p>Order not found.</p>
        <button className="btn" onClick={() => navigate('/orders')}>Back to Orders</button>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>Receipt</h2>
      <p><strong>Item:</strong> {order.itemTitle}</p>
      <p><strong>Amount:</strong> {formatINR(order.price)} × {order.quantity}</p>
      <p><strong>Ship to:</strong> {order.address}</p>
      {order.method && <p><strong>Method:</strong> {order.method.toUpperCase()}</p>}
      {order.paymentId && <p><strong>Payment ID:</strong> {order.paymentId}</p>}
      <p><strong>Status:</strong> {order.status?.toUpperCase() || 'SUCCESS'}</p>
      {order.status === 'failed' && (
        <>
          {order.failureReason && <p className="error">{order.failureReason}</p>}
          <Link className="btn primary" to={`/payment/${order.itemId}`} state={{ address: order.address }}>Retry Payment</Link>
        </>
      )}
      {order.status !== 'failed' && (
        <Link className="btn" to="/orders">View All Orders</Link>
      )}
    </section>
  );
}
