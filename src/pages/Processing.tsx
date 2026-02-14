import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderById, updateOrder } from '../services/orders';

export default function Processing() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const order = getOrderById(id);
    if (!order) {
      navigate('/orders');
      return;
    }
    if (order.status === 'success') {
      navigate(`/receipt/${order.id}`);
      return;
    }
    const t = setTimeout(() => {
      updateOrder(order.id, { status: 'success' });
      navigate(`/receipt/${order.id}`);
    }, 1500);
    return () => clearTimeout(t);
  }, [id, navigate]);

  return (
    <section className="card">
      <h2>Processing Payment…</h2>
      <p>Please wait while we confirm your payment with the bank.</p>
    </section>
  );
}
