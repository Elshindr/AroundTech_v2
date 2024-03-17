import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../../Contexts/UserContext';
import { Loading } from '../../Modules/loadingError/loadingErrorComponent';

const RoleGuard = ({ allowedRoles, children }) => {
    const { user } = useUser();
    let hasPermission = user && allowedRoles.some(role => user.role.id === role);

    useEffect(() => {
        hasPermission = user && allowedRoles.some(role => user.role.id === role);
    }, [user]);


    if (hasPermission === null){
        return <Loading />;
    }

    return hasPermission ? children : <Navigate to="/unauthorized" replace />;

};

export default RoleGuard;