import { GetLocationList } from "../../javascript-functions/database-access.mjs";
import ShowUserList from "./ShowUserList.js";
import React from 'react';

import { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from "./UserCard.js";

/**
 * Gets all fo the users as a list
 * @returns the list of Users, similar to one in assassinGraph
 */
function GetUserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('https://express-backend.fly.dev/api/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowUserList');
      });
  }, []);
  
  const userList = users;
  if (userList !== undefined) {
    const realusers =
      users.length === 0
      ? "there is no user record!"
      : users.map((user, k) => <UserCard user={user} key={k} /> );
    return realusers;
  }
  
}

/**
 * Used to output the HomePage to the screen
 * @returns the HomePage with inputs of the users and locations of eliminations since HomePage cannot use React Hooks
 */
export default function ShowShowUserList() {
  var test = GetUserList()
  console.log(test)
    return (
        <div className="showuserlist">
            <ShowUserList userList = {GetUserList()}/>
        </div>
    )
    
}


// 
