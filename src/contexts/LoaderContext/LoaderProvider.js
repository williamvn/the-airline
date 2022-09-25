import React, { useState } from 'react'
import { LoaderContext } from './LoaderContext';

export const LoaderProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoaderContext.Provider>
    )
}
