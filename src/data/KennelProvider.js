import React, { useState, useEffect } from 'react';
import { fetchIt } from './Fetch';

// The context is imported and used by individual components that need data
export const KennelContext = React.createContext([{}, () => {}])


/*
 This component establishes what data can be used.
 */
export const KennelProvider = props => {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        fetchIt("http://localhost:5002/animals").then(setAnimals)
    }, [])

    return (
        <KennelContext.Provider value={{animals, setAnimals}}>
            {props.children}
        </KennelContext.Provider>
    )
}

