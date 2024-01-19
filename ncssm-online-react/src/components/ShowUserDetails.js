import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import CallerOfGraphs from "../javascript-functions/assassingraph.mjs";
import GetUserList from "../javascript-functions/database-access.mjs";

/**
 * Shows the details of a user for the user, can limit information shown, no real props
 * @param {*} props 
 * @returns 
 */
function ShowUserDetails(props) {
  const [user, setUser] = useState({});
  const [userTarget, setUserTarget] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  // Gets the user's information, then their target's information
  useEffect(() => {
    var usR;
    axios
      .get(`https://express-backend.fly.dev/api/users/${id}`)
      .then((res) => {
        setUser(res.data);
        usR = res.data;
    if (usR.playerTarget === ""){
      return;
    }
    axios
      .get(`https://express-backend.fly.dev/api/users/${usR.playerTarget}`)
      .then((res) => {
        setUserTarget(res.data);
      })
      .catch((err) => {
        console.log("ER2: " + usR.firstName);
        console.log('Error from ShowUserDetails');
      });
      })
  .catch((err) => {
    console.log('Error from ShowUserDetails');
  });
      
  }, [id]);

  // Deletes the user
  const onDeleteClick = (id) => {
    axios
      .delete(`https://express-backend.fly.dev/api/users/${id}`)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        console.log('Error form ShowUserDetails_deleteClick');
      });
  };

  const UserItem = (
    <div>
      <table className='table table-hover table-dark'>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>User's Name</td>
            <td>{user.firstName}  {user.lastName}</td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th scope='row'>4</th>
            <td>Player's Current Target</td>
            <td>        {userTarget === null ? (
          <p></p>
        ) : (
          <p>{userTarget.firstName} {userTarget.lastName}</p>
        )}</td>
          </tr>
          <tr>
            <th scope='row'>5</th>
            <td>Player's Eliminations</td>
            <td>{user.playerEliminations}</td>
          </tr>
          <tr>
            <th scope='row'>6</th>
            <td>Player's Status</td>
            <td>Still Alive: {user.playerStatus}</td>
          </tr>
          <tr>
            <th scope='row'>7</th>
            <td>Player's Role</td>
            <td>{user.role}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  /**
   * Gives admins the ability to edit a user 
   * @returns the button to edit a user
   */
  const showEditUser = () => {
    // if (user.role === "Ad") {
      return (
        <Link
          to={`/edit-user/${user._id}`}
          className='btn btn-outline-info btn-lg btn-block'
        >
          Edit User
        </Link>
      );
    // }
  }

  /**
   * Gives admins the ability to delete a user, completely
   * @returns the button to delete a user
   */
  const showDeleteUser = () => {
    // if (user.role === "Ad") {
      return (
        <button
          type='button'
          className='btn btn-outline-danger btn-lg btn-block'
          onClick={() => {
            onDeleteClick(user._id);
          }}
        >
          Delete User
        </button>
      );
    // }
  }

  return (
    <div className='ShowUserDetails'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br /> <br />
            <Link to='/admin-only' className='btn btn-outline-warning float-left'>
              Show User List
            </Link>
            <Link to='/update-elimination' className='btn btn-outline-warning float-right'>
              Log an Elimination
            </Link>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>User's Record</h1>
            <p className='lead text-center'>View User's Info</p>
            <hr /> <br />
          </div>
          <div className='col-md-10 m-auto'>{UserItem}</div>
          <div className='col-md-6 m-auto'>
            {showDeleteUser()}
          </div>
          <div className='col-md-6 m-auto'>
            {showEditUser()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowUserDetails;