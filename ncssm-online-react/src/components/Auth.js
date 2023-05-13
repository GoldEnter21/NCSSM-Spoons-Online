import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from "../context/auth-provider";

import React from 'react'

const Auth = ({ allowedRoles }) => {
    const {auth} = useContext(AuthContext);
    const location = useLocation();
    // console.log(auth);

  return (
    allowedRoles.find(role => auth?.role?.includes(role))
     // auth.role.find(role => allowedRoles?.includes(role))
      ? <Outlet/>
      : auth?.name
        ? <Navigate to="/" state={{ from: location}} replace/>
        : <Navigate to="/register-user" state={{from: location}} replace/>
  )
}

export default Auth;