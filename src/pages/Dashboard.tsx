import { useEffect, useMemo, useState } from 'react';
import { listItems } from '../services/catalog';
import { Link } from 'react-router-dom';
import { formatINR } from '../utils/currency';

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState(listItems());

  useEffect(() => {
    setItems(listItems(query));
  }, [query]);

  const results = useMemo(() => items, [items]);

  return (
    <section>
      <h2>Catalog</h2>
      <div className="search-bar">
        <input
          placeholder="Search items..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <div className="grid">
        {results.map(item => (
          <div key={item.id} className="card product-card">
            {item.imageUrl && <img src={item.imageUrl} alt={item.title} />}
            <h3>{item.title}</h3>
            <p className="price">{formatINR(item.price)}</p>
            <p className="desc">{item.description}</p>
            <Link className="btn" to={`/item/${item.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </section>
  );
}
