import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout, isAuthenticated } from '../services/auth';

export default function NavBar() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard" className="brand">BuyNow</Link>
        {isAuthenticated() && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/orders">Orders</Link>
          </>
        )}
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <span className="user">{user.name} ({user.email})</span>
            <button className="btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}
