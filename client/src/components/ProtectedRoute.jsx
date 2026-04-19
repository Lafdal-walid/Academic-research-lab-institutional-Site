import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        // Not logged in, redirect to login page with the return url
        return <Navigate to="/#login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Role not authorized, redirect to their home dashboard or home page
        if (user.role === 'user') {
            return <Navigate to="/usersdashboard" replace />;
        } else if (user.role === 'admin' || user.role === 'superadmin') {
            return <Navigate to="/leaderdashboard" replace />;
        }
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
