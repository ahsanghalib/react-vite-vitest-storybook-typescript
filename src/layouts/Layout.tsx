import { useTokenStore } from '@/store';
import { Navigate, Outlet } from 'react-router-dom';

export const Layout = () => {
  const isAuth = useTokenStore((s) => s.isAuth);

  if (isAuth()) {
    return <Navigate to='/' replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
