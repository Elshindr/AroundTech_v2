import React, { createContext, useContext, useState } from 'react';

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
        updateUser,
        error,
        loading,
        setLoading,
        setError
    };

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
