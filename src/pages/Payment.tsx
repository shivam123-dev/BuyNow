import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getItemById } from '../services/catalog';
import { getCurrentUser } from '../services/auth';
import { addOrder } from '../services/orders';
import { useState } from 'react';
import MockCheckout from '../components/MockCheckout';
import { formatINR } from '../utils/currency';

export default function Payment() {
  const { id } = useParams();
  const item = id ? getItemById(id) : null;
  const user = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation() as any;

  const [address, setAddress] = useState(location?.state?.address || '');
  const [showGateway, setShowGateway] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!item || !user) {
    return (
      <section className="card">
        <h2>Payment</h2>
        <p>Missing item or user. Please try again.</p>
      </section>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      setError('Please enter a shipping address.');
      return;
    }
    setError(null);
    setShowGateway(true);
  };

  return (
    <section className="card">
      <h2>Payment for {item.title}</h2>
      <p className="price">Total: {formatINR(item.price)}</p>
      <form onSubmit={onSubmit} className="form">
        <label>
          Shipping Address
          <input value={address} onChange={e => setAddress(e.target.value)} required />
        </label>
        <button className="btn primary" type="submit">Proceed to Pay</button>
      </form>
      {error && <p className="error">{error}</p>}

      <MockCheckout
        open={showGateway}
        amount={item.price}
        currency="INR"
        name="BuyNow Checkout"
        description={item.title}
        prefill={{ name: user.name, email: user.email }}
        onSuccess={({ paymentId, method, last4 }) => {
          // Create a pending order, then move to processing screen to simulate webhook confirmation
          const pending = addOrder({
            userEmail: user.email,
            itemId: item.id,
            itemTitle: item.title,
            price: item.price,
            quantity: 1,
            address,
            last4: last4 || '0000',
            method,
            paymentId,
            status: 'pending',
          });
          setShowGateway(false);
          navigate(`/processing/${pending.id}`);
        }}
        onFailure={(msg, method) => {
          const failed = addOrder({
            userEmail: user.email,
            itemId: item.id,
            itemTitle: item.title,
            price: item.price,
            quantity: 1,
            address,
            last4: '0000',
            method: method || 'card',
            status: 'failed',
            failureReason: msg,
          });
          setShowGateway(false);
          navigate(`/receipt/${failed.id}`);
        }}
        onClose={() => {
          // Treat cancel as a failure with a specific reason for traceability
          setShowGateway(false);
          setError('Payment cancelled. You can retry.');
        }}
      />
    </section>
  );
}
