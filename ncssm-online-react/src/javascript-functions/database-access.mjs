import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import { GetUserList } from 'filepath';
// userList = GetUserList();
// userList[0]["firstName"];

import axios from 'axios';

export default function GetUserList() {
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
  if (userList !== undefined) {
    return userList;
  }
}

// export function ChangeUser(data, id) {
//   // This is the way that data should be formatted when passing into the function
//   // const data = {
//   //   firstName: user.firstName,
//   //   lastName: user.lastName,
//   //   password: user.password,
//   //   email: user.email,
//   //   playerEliminations: user.playerEliminations,
//   //   playerStatus: user.playerStatus,
//   //   playerTarget: user.playerTarget
//   // };

//   const navigate = useNavigate();

//   axios
//     .put(`http://localhost:8082/api/users/${id}`, data)
//     .then((res) => {
//       navigate(`../show-user/${id}`, { replace: true });
//     })
//     .catch((err) => {
//       console.log('Error in UpdateUserInfo!');
//     });

// }

