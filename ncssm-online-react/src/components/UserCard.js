import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const UserCard = (props) => {
  const user = props.user;

  return (
    <div className='card-container'>
        {/* TODO: Change this image to be the user's input image, probably in the create user upload image ability */}
        
      <img
        src='https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'
        alt='Users'
        height={200}
      />
      <div className='desc'>
        <h2>
          <Link to={`/show-user/${user._id}`}>{user.firstName} {user.lastName}</Link>
        </h2>
        <h3>{user.email}</h3>
        <p>Eliminations: {user.playerEliminations}</p>
        <p>Status: {user.playerIsAlive}</p>
      </div>
    </div>
  );
};

export default UserCard;