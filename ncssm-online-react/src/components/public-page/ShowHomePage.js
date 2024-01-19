import { GetLocationList } from "../../javascript-functions/database-access.mjs";
import HomePage from "./HomePage.js";
import React from 'react';

import { useState, useEffect } from 'react';
import axios from 'axios';
/**
 * Gets all fo the users as a list
 * @returns the list of Users, similar to one in assassinGraph
 */
function GetUserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://https://express-backend.fly.dev//api/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowUserList');
      });
  }, []);
  
  const userList = users;
  if (userList !== undefined) {
    return userList;
  }
}

/**
 * Used to output the HomePage to the screen
 * @returns the HomePage with inputs of the users and locations of eliminations since HomePage cannot use React Hooks
 */
export default function ShowHomePage() {
    return (
        <div className="home">
            <HomePage userList = {GetUserList()} locationList={GetLocationList()}/>
        </div>
    )
    
}
