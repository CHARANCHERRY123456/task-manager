import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import { authService } from '../services/authService';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    )
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />
  }
]);