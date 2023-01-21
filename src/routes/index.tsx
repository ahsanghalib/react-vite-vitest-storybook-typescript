import { ProtectedLayout, Layout } from '@/layouts';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

interface Props {}

export const AppRoutes: React.FC<Props> = () => {
  return (
    <Routes>
      <Route path='*' element={<Navigate to='/' />} />
      <Route element={<Layout />}>
        <Route path='/login' element={<div>Login</div>} />
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route path='/' element={<div>Home</div>} />
        <Route path='/channels' element={<div>Channels</div>} />
      </Route>
    </Routes>
  );
};
