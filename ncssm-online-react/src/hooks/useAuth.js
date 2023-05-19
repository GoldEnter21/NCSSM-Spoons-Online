import { useContext } from "react";
import {AuthContext} from "../context/auth-provider";

// Combines useContext with AuthContext to show you are using AuthContext
const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;