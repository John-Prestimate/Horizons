import React from 'react';
import { Navigate } from 'react-router-dom';

const AppDashboardPage = () => {
  // This page is now deprecated and redirects to the new /dashboard route.
  // The logic is now handled in DashboardPage.jsx
  return <Navigate to="/dashboard" replace />;
};

export default AppDashboardPage;