import { useState } from 'react';
import { register } from '../services/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = register(name.trim(), email.trim(), password);
    if (!res.ok) {
      setError(res.message || 'Registration failed');
      setSuccess(null);
      return;
    }
    setError(null);
    setSuccess('Registration successful. Please login.');
    setTimeout(() => navigate('/login'), 800);
  };

  return (
    <section className="card">
      <h2>Create Account</h2>
      <form onSubmit={onSubmit} className="form">
        <label>
          Name
          <input value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <button className="btn primary" type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </section>
  );
}
