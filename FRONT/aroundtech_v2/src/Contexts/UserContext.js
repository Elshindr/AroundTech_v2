import React, { createContext, useContext, useState, useEffect } from 'react';


//import UserInterface from '../interfaces/UserInterface';

/* interface UserContextType {
    user: UserInterface | null;
    setUser: React.Dispatch<React.SetStateAction<UserInterface | null>>;
    updateUser: (newUser: UserInterface) => void;
}

 */

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const updateUser = (newUser) => {
        setUser(newUser);
    };

    const contextValue = {
        user,
        setUser,
        updateUser,
        error,
        loading
    };

    const fetchUser = async () => {

        try {
            const url = `${process.env.REACT_APP_BACK_URL}`;
            // const response = await fetch(url+'info-user', { credentials: 'include' });

            const response = await fetch(`${process.env.REACT_APP_BACK_URL}login/user-info`)
                .then(res => {
                    return res.json();
                })
                .then(us => {
                    console.log(`us`, us)
                    return us;
                })
                .catch(error => {
                    console.error("Erreur dans loadUser", error);
                });

            console.log(`res userprovider`, response);
            if (response.ok) {
                console.log(`context userfetch is ok`);
                const dataUser = await response.json();
                console.log(`context userfetch`, dataUser);
                updateUser(dataUser);
                console.log(`user set`);
            } else {
                console.log(`hook user data fail`, response);
                throw new Error('Échec du chargement des données utilisateur');
            }

        } catch (error) {
            console.error('Erreur lors de la récupération des informations utilisateur', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) {
            fetchUser();
        }
    }, [user]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === null) {
        throw new Error('useUser n est pas dans wrapper dans UserProvider');
    }
    return context;
}

/*
function useEffect(arg0: () => void, arg1: (UserInterface | null)[]) {
    throw new Error('Function not implemented.');
}*/
