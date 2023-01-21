import { useTokenStore } from '@/store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedLayout = () => {
  const isAuth = useTokenStore((s) => s.isAuth);
  const location = useLocation();

  if (!isAuth()) {
    return <Navigate to={`/login?next=${location.pathname}`} state={{ from: location }} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
