import { useParams, Link, useNavigate } from 'react-router-dom';
import { getItemById } from '../services/catalog';
import { formatINR } from '../utils/currency';

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = id ? getItemById(id) : null;

  if (!item) {
    return (
      <section className="card">
        <h2>Item not found</h2>
        <button className="btn" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>{item.title}</h2>
      {item.imageUrl && <img className="hero" src={item.imageUrl} alt={item.title} />}
      <p className="price">{formatINR(item.price)}</p>
      <p>{item.description}</p>
      <div className="actions">
        <Link className="btn primary" to={`/payment/${item.id}`}>Buy Now</Link>
        <Link className="btn" to="/dashboard">Back</Link>
      </div>
    </section>
  );
}
