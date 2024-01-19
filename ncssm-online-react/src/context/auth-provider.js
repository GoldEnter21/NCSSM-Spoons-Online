import { createContext, useState } from "react";

const AuthContext = createContext({});

/**
 * Sets the auth for passed in children
 * @param {*} param0 
 * @returns 
 */
const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    return (
        <AuthContext.Provider value = {{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider};