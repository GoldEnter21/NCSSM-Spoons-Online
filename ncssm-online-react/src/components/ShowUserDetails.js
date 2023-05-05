import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function ShowUserDetails(props) {
  const [user, setUser] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowUserDetails');
      });
  }, [id]);

  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:8082/api/users/${id}`)
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
            <th scope='row'>2</th>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>Player's Eliminations</td>
            <td>{user.playerEliminations}</td>
          </tr>
          <tr>
            <th scope='row'>4</th>
            <td>Player's Status</td>
            <td>Still Alive: {user.playerStatus}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className='ShowUserDetails'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br /> <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show User List
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
            <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={() => {
                onDeleteClick(user._id);
              }}
            >
              Delete User
            </button>
          </div>
          <div className='col-md-6 m-auto'>
            <Link
              to={`/edit-user/${user._id}`}
              className='btn btn-outline-info btn-lg btn-block'
            >
              Edit User
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowUserDetails;