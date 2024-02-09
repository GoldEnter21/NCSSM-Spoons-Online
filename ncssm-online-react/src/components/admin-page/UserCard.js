import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';

/**
 * Takes in a user object and output a card with related information
 * @param {user} props 
 * @returns a Bootstrap formatted card with some user information
 */
const UserCard = (props) => {
  const user = props.user;

  const [userTarget, setUserTarget] = useState({});
  
  // Gets the user's target's information
  useEffect(() => {
    if (user.playerTarget === ""){
      return;
    }
    axios
      .get(`https://express-backend.fly.dev/api/users/${user.playerTarget}`)
      .then((res) => {
        setUserTarget(res.data);
      })
      .catch((err) => {
        console.log("ER2: " + user.firstName);
        console.log('Error from ShowUserDetails');
        console.log(user.playerTarget)
      });
      
  }, []);

  const onDeleteClick = (id) => {
    axios
      .delete(`https://express-backend.fly.dev/api/users/${id}`)
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => {
        console.log('Error form ShowUserDetails_deleteClick');
      });
  };

  return (
    <>
        {/* TODO: Change this image to be the user's input image, probably in the create user upload image ability
        
      {/* <img
        src='https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'
        alt='Users'
        height={200}
      /> */}
    <tr>
    {/* <Link to={`/show-user/${user._id}`}> */}
      <td>{user.firstName} {user.lastName}</td>
      <td>{user.hall}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>{user.playerEliminations}</td>
      <td>{user.playerStatus}</td>
      <td>{user.alias}</td>
      <td>
        {userTarget.firstName} {userTarget.lastName}
      </td>
      <td>        
        <Link
          to={`/edit-user/${user._id}`}
          className='btn btn-outline-secondary btn-block'
        >
          Edit User
        </Link>
      </td>
      <td>        
        <button
          type='button'
          className='btn btn-outline-danger btn-block'
          onClick={() => {
            onDeleteClick(user._id);
          }}
        >
          Delete User
        </button>
      </td>
    </tr>
    </>
  );
};

export default UserCard;

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