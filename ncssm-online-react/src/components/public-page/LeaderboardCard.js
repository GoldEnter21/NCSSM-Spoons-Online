import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import TimeComponent from "./timer";
import TimeComponentUp from "./uptimer";
import TimeComponentL from "./leadtime";

/**
 * Takes in a user object and output a card with related information
 * @param {user} props 
 * @returns a Bootstrap formatted card with some user information
 */
const LeaderboardCard = (props) => {
  const user = props.user;
  
  // Gets the user's target's information
  useEffect(() => {
    if (user.playerTarget === ""){
      return;
    }
    axios
      .get(`https://express-backend.fly.dev/api/users/${user.playerTarget}`)
      .then((res) => {
      })
      .catch((err) => {
        console.log("ER2: " + user.firstName);
        console.log('Error from ShowUserDetails');
        console.log(user.playerTarget)
      });
      
  }, []);

  {/* <Link to={`/show-user/${user._id}`}> */}
  if (user.role === "Ad") {return};
  if (user.alias === "" || user.useAlias === "false") {
    if (user.playerStatus === "alive") {
      return (
        <tr>
        <td>{user.firstName} {user.lastName}</td>
        <td>{user.playerEliminations}</td>
        <td style={{color: "#d8ffb1"}}>{user.playerStatus}</td>
        <td><TimeComponentUp></TimeComponentUp></td>
        </tr>
      );
    };
    if (user.playerStatus !== "alive") {
      return (
        <tr>
        <td>{user.firstName} {user.lastName}</td>
        <td>{user.playerEliminations}</td>
        <td style={{color: '#ff7f7f'}}>dead</td>
        <td style={{color: '#ff7f7f'}}>{user.playerStatus}</td>
        </tr>
      );
    };
  };
  if (user.alias !== "" && user.useAlias === "true") {
    if (user.playerStatus === "alive") {
      return (
        <tr>
        <td style={{fontStyle:"italic", color:"#fddc5c"}}>{user.alias}</td>
        <td>{user.playerEliminations}</td>
        <td style={{color: "#d8ffb1"}}>{user.playerStatus}</td>
        <td><TimeComponentUp></TimeComponentUp></td>
        </tr>
      );
    };
    if (user.playerStatus !== "alive") {
      return (
        <tr>
        <td style={{fontStyle:"italic", color:"#fddc5c"}}>{user.alias}</td>
        <td>{user.playerEliminations}</td>
        <td style={{color: '#ff7f7f'}}>dead</td>
        <td style={{color: '#ff7f7f'}}>{user.playerStatus}</td>
        </tr>
      );
    };
    };
};

export default LeaderboardCard;

{/* <div className='desc'>
<h2>
  <Link to={`/show-user/${user._id}`}>{user.firstName} {user.lastName}</Link>
</h2>
<h3>{user.email}</h3>
<p>Role: {user.role}</p>
<p>Eliminations: {user.playerEliminations}</p>
<p>Status: {user.playerStatus}</p>
<p>Target: {userTarget.firstName} {userTarget.lastName}</p>
*/}