import { isAuthenticated } from '../services/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { PropsWithChildren } from 'react';

export default function RequireAuth({ children }: PropsWithChildren) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <>{children}</>;
}
