import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "../context/auth-provider";

import React from 'react'

/**
 * Adds the auth and specifices where to go if not already determined
 * @param {list with strings} param0 
 * @returns 
 */
const Auth = ({ allowedRoles }) => {
    const {auth} = useContext(AuthContext);
    const location = useLocation();

  return (
    allowedRoles.find(role => auth?.role?.includes(role))
      ? <Outlet/>
      : auth?.name
        ? <Navigate to="/" state={{ from: location}} replace/>
        : <Navigate to="/register-user" state={{from: location}} replace/>
  )
}

export default Auth;