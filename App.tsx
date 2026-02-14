import { Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import RequireAuth from './components/RequireAuth';
import { isAuthenticated } from './services/auth';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ItemDetail from './pages/ItemDetail';
import Payment from './pages/Payment';
import Orders from './pages/Orders';
import Processing from './pages/Processing';
import Receipt from './pages/Receipt';

export default function App() {
  const defaultRoute = isAuthenticated() ? '/dashboard' : '/login';
  return (
    <div className="app-shell">
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to={defaultRoute} replace />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/item/:id"
            element={
              <RequireAuth>
                <ItemDetail />
              </RequireAuth>
            }
          />
          <Route
            path="/payment/:id"
            element={
              <RequireAuth>
                <Payment />
              </RequireAuth>
            }
          />
          <Route
            path="/orders"
            element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
            }
          />
          <Route
            path="/processing/:id"
            element={
              <RequireAuth>
                <Processing />
              </RequireAuth>
            }
          />
          <Route
            path="/receipt/:id"
            element={
              <RequireAuth>
                <Receipt />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to={defaultRoute} replace />} />
        </Routes>
      </main>
    </div>
  );
}
