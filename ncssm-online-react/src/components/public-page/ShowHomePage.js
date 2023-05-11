// import GetUserList from "../../javascript-functions/database-access.mjs";
import HomePage from "./HomePage.js";
import React from 'react';

import { useState, useEffect } from 'react';
import axios from 'axios';
function GetUserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8082/api/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowUserList');
      });
  }, []);
  
  const userList = users;
  console.log(userList.length);
  if (userList !== undefined) {
    return userList;
  }
}

export default function ShowHomePage() {
    return (
        <div className="home">
            <div>
                HI
            </div>
            <HomePage userList = {GetUserList()}/>
        </div>
    )
    
}
