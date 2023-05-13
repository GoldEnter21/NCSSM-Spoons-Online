import { useState, useEffect } from "react";

import axios from "axios";

export default function GetUserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8082/api/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("Error from ShowUserList");
      });
  }, []);

  const userList = users;
  if (userList !== undefined) {
    return userList;
  }
}

export function ChangeUser(data, id) {
  console.log("In Change User");
  axios
    .put(`http://localhost:8082/api/users/${id}`, data)
    .then((res) => {
      console.log("Done: " + res.data);
    })
    .catch((err) => {
      console.log("Error in UpdateUserInfo!");
    });
}

export function GetUser(player, playerTid) {
  axios
    .get(`http://localhost:8082/api/users/${playerTid}`)
    .then((res) => {
      console.log("Got User: " + res.data.playerTarget);
      RemoveUser(playerTid);
      console.log("Removed user " + playerTid);
    })
    .then((res) => {
      ChangeUser(
        {
          role: player.role,
          firstName: player.firstName,
          lastName: player.lastName,
          password: player.password,
          email: player.email,
          playerEliminations: player.playerEliminations + 1,
          playerStatus: "alive",
          playerTarget: res.data.playerTarget,
        },
        player._id
      );
      console.log("Updated player " + player.firstName + " successfully");
      return true;
    })
    .catch((err) => {
      console.log("Error in ChangeUser! " + err.message);
    });
}

export function RemoveUser(id) {
  if (id === null || id === undefined) {
    return;
  }
  axios.delete(`http://localhost:8082/api/users/${id}`).then((res) => {
    console.log("Deleted user complete");
    return res.data;
  });
}
