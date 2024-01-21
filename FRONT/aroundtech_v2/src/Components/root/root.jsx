import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../index.css';
import { useUser } from '../../Contexts/UserContext';
import UserService from '../../Services/UserService';
import Header from "./header/header";
import Footer from './footer/footer';


export default function Root() {
    const contextUser = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!contextUser.user || contextUser.user === null) {
            fetchUser();
        }
        contextUser.setLoading(false);
    }, [contextUser.user]);


    const fetchUser = async () => {

        try {
            contextUser.setLoading(true);
            const response = await UserService.getUserInfo();
            if (response !== undefined) {

                const dataUser = response;
                console.log(`context userfetch`, dataUser);
                contextUser.updateUser(dataUser);

            } else if (response === undefined) {
                console.log(`hook user data fail`, response);
                contextUser.updateUser(null);

                navigate('/login', { replace: true });

            } else {
                throw new Error('Échec du chargement des données utilisateur');
            }

        } catch (error) {
            console.error('Erreur lors de la récupération des informations utilisateur', error);
            contextUser.setLoading(false);
            contextUser.setError(error.message);
        }
    };


    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}