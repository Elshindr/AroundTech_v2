import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../../Contexts/UserContext';

const RoleGuard = ({ allowedRoles, children }) => {
    const { user } = useUser();
    let hasPermission = false;

    useEffect(() => {
        hasPermission = user && allowedRoles.some(role => user.role.id === role);
    }, [user]);


    return hasPermission ? children : <Navigate to="/unauthorized" replace />;

};

export default RoleGuard;