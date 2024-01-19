import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../index.css';
import { useUser } from '../../Contexts/UserContext';

import Header from "./header/header";
import Footer from './footer/footer';


export default function Root() {
    const contextUser = useUser();
    const navigate = useNavigate();

    useEffect(() => {

        if (contextUser.user === null) {
            contextUser.updateUser({
                "id": 1,
                "idRole": 3,
                "idManager": 8,
                "lastname": "Doe",
                "firstname": "John",
                "email": "johnd@aroundtech.com"
            })
            //navigate('/login', { replace: true });
        } else {
            //navigate("/", { replace: true });
        }
    }, [contextUser]);

    return (
        <>
            <Header contextUser={contextUser} />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}