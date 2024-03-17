import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../../Contexts/UserContext';


const RoleGuard = ({ children }) => {
    const { user } = useUser();
    let isAuth = user !== null ? true: false;

    useEffect(() => {
        isAuth = user !== null ? true: false;
    }, [user]);


    return isAuth ? children : <Navigate to="/login" replace />;

};

export default RoleGuard;