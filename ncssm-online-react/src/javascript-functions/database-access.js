import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
}

export default GetUserList;