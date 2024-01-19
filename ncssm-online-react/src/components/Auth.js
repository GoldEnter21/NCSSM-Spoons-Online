import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import {AuthContext} from "../context/auth-provider";
import axios from "axios";

import React from 'react'

/**
 * Adds the auth and specifices where to go if not already determined
 * @param {list with strings} param0 
 * @returns 
 */
const Auth = ({ allowedRoles }) => {
    // const {auth} = useContext(AuthContext);
    // const location = useLocation();
    // console.log(allowedRoles.find(role => auth?.role?.includes(role)));
    // console.log(allowedRoles);
    const [success, setSuccess] = useState();
  
    useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
      if (!loggedInUser) {
        setSuccess(false)
      }
      axios.get(`https://express-backend.fly.dev/api/users/${loggedInUser}`)
      .then((res) => {
        if (res.data.password === localStorage.getItem("pass") && allowedRoles.find(role => res?.data?.role?.includes(role))) {
            console.log("success auth")
            setSuccess(true)
        } else {
            setSuccess(false)
        }
      })
    }, []);
  
  return (
    success !== undefined
      ? success? <Outlet/> :
      // : auth?.name ?
        <Navigate to="/" replace/>
      : <></>
      //   : <Navigate to="/register-user" state={{from: location}} replace/>
  )
}

export default Auth;