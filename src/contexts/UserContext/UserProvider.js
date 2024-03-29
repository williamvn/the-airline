import React from 'react'
import { useUserClient } from '../../Hooks/useUserClient';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
    const [userClient, setUserClient] = useUserClient();

    return (
        <UserContext.Provider value={{ userClient, setUserClient }}>
            {children}
        </UserContext.Provider>
    )
}
