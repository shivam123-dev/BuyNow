import { useState } from 'react';
import { login } from '../services/auth';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation() as any;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = login(email.trim(), password);
    if (!res.ok) {
      setError(res.message || 'Login failed');
      return;
    }
    const to = location.state?.from?.pathname || '/dashboard';
    navigate(to);
  };

  return (
    <section className="card">
      <h2>Login</h2>
      <form onSubmit={onSubmit} className="form">
        <label>
          Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <button className="btn primary" type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>New user? <Link to="/register">Create an account</Link></p>
    </section>
  );
}
