import { useState, useEffect } from "react";

import axios from "axios";

/**
 * Makes a list of all users in the database, requires React Hooks
 * @returns a list of all users in the database
 */
export default function GetUserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://express-backend.fly.dev/api/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("Error from GetUserList");
      });
  }, []);
  
  const userList = users;
  if (userList !== undefined) {
    return userList;
  }
}


/**
 * Changes a specific user with the given data, does not require React Hooks
 * @param {PlayerObject} data 
 * @param {_id} id 
 */
export function ChangeUser(data, id) {
  console.log("In Change User");
  axios 
    .put(`https://express-backend.fly.dev/api/users/${id}`, data)
    .then((res) => {
      console.log("Done: " + res.data);
    })
    .catch((err) => {
      console.log("Error in ChangeUser!: " + err.message);
    });
}

/**
 * TODO: probably should make it so the user isn't completely removed from the database, but just set as dead
 * This would also mean adding a check when creating the graphs and bst to see if a player is dead. If they are then 
 *    you wouldn't add them to the data structure
 * Used to remove a player from the graph and change the target to the eliminated player's target, does not require React Hooks
 * @param {PlayerObject} player 
 * @param {_id} playerTid
 */
export function ChangeUserTarget(player, playerTid) {
  axios
    .get(`https://express-backend.fly.dev/api/users/`)
    .then((res) => {
      axios.get(`https://express-backend.fly.dev/api/users/${playerTid}`).then((response) => 
      ChangeUser(
        {
          role: player.role,
          firstName: player.firstName,
          lastName: player.lastName,
          password: player.password,
          email: player.email,
          playerEliminations: player.playerEliminations + 1,
          playerStatus: "alive",
          playerTarget: response.data.playerTarget,
        },
        player.id
      ))
      ChangeUser(
        {
          playerStatus: "dead",
        },
        playerTid
      );
      return true;
    }).then((res) => {
    })
    .catch((err) => {
      console.log("Error in ChangeUserTarget" + err.message);
    });
}

/**
 * Removes a specificed user, does not require React Hooks
 * @param {_id} id 
 * @returns 
 */
export function RemoveUser(id) {
  if (id === null || id === undefined) {
    return;
  }
  axios.delete(`https://express-backend.fly.dev/api/users/${id}`).then((res) => {
    console.log("Deleted user complete");
    return res.data;
  });
}

// export function KillUser(id) {
//   if (id === null || id === undefined) {
//     return;
//   }
//   axios.get(`http://localhost:8082/api/users/${id}`).then((res) => {
//     ChangeUser(
//       {
//         role: target.role,
//         firstName: target.firstName,
//         lastName: target.lastName,
//         password: target.password,
//         email: target.email,
//         playerEliminations: target.playerEliminations,
//         playerStatus: "dead",
//         playerTarget: "No One!"
//       },
//       id);
//     console.log("Killed user complete");
//     return res.data;
//   });
// }

// export function KillUser(player, playerTid) {
//   axios
//     .get(`http://localhost:8082/api/users/${playerTid}`)
//     .then((res) => {
//       ChangeUser(
//         {
//           role: player.role,
//           firstName: player.firstName,
//           lastName: player.lastName,
//           password: player.password,
//           email: player.email,
//           playerEliminations: player.playerEliminations + 1,
//           playerStatus: "dead",
//           playerTarget: player.playerTarget,
//         },
//         player.id
//       );
//       return true;
//     })
//     .catch((err) => {
//       console.log("Error in ChangeKillTarget" + err.message);
//     });
// }

/**
 * Makes a list of all locations of eliminations, requires React Hooks
 * @returns list of all elimination locations
 */
export function GetLocationList() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios
      .get("https://express-backend.fly.dev/api/locations")
      .then((res) => {
        setLocations(res.data);
      })
      .catch((err) => {
        console.log("Error from GetLocationList");
      });
  }, []);

  const locationList = locations;
  if (locationList !== undefined) {
    return locationList;
  }
}
/**
 * Adds a location and information for an elimination, variables are abbreviated to differentiate, does not require React Hooks
 * @param {string} loc = location
 * @param {string} da  = date
 * @param {string} pE  = playerEliminator
 * @param {string} pK  = playerKilled
 */
export function AddLocation(loc, da, pE, pK, pT, pEN, pKN, pTN) {
  const data = {
    location:loc,
    date: da,
    playerEliminator: pE,
    playerKilled: pK,
    playerTargetKey: pT,
    playerEliminatorN: pEN,
    playerKilledN: pKN,
    playerTargetKeyN: pTN
  }
  console.log(data)
  axios
    .post(`https://express-backend.fly.dev/api/locations/`, data)
    .then((res) => {
      console.log("Added location: " + res.data);
    })
    .catch((err) => {
      console.log("Error in AddLocation " + err.message);
    });
}