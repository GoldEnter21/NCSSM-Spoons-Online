import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

/**
 * Updates a user's info, no real props
 * @param {*} props 
 * @returns a form to fill out the data changes for a user
 */
function UpdateUserInfo(props) {
  const [user, setUser] = useState({
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    playerEliminations: 0,
    playerStatus: '',
    playerTarget: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // Finds the user and sets the state info to the response
  useEffect(() => {
    axios
      .get(`https://express-backend.fly.dev/api/users/${id}`)
      .then((res) => {
        setUser({
            role: res.data.role,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            password: res.data.password,
            email: res.data.email,
            playerEliminations: res.data.playerEliminations,
            playerStatus: res.data.playerStatus,
            playerTarget: res.data.playerTarget
        });
      })
      .catch((err) => {
        console.log('Error from UpdateUserInfo');
      });
  }, [id]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Will make the put request on the changed data
  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        playerEliminations: user.playerEliminations,
        playerStatus: user.playerStatus,
        playerTarget: user.playerTarget
    };

    axios
      .put(`https://express-backend.fly.dev/api/users/${id}`, data)
      .then((res) => {
        navigate(`/show-user/${id}`);
      })
      .catch((err) => {
        console.log('Error in UpdateUserInfo!');
      });
  };

  return (
    <div className='UpdateUserInfo'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/admin-only' className='btn btn-outline-warning float-left'>
              Show User List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit User</h1>
            <p className='lead text-center'>Update User's Info</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
          <form noValidate onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='role'>Role</label>
              <input
                type='text'
                placeholder='Role'
                name='role'
                className='form-control'
                value={user.role}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='firstName'>First Name</label>
              <input
                type='text'
                placeholder='First Name'
                name='firstName'
                className='form-control'
                value={user.firstName}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='lastName'>Last Name</label>
              <input
                type='text'
                placeholder='Last Name'
                name='lastName'
                className='form-control'
                value={user.lastName}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='text'
                placeholder='Password'
                name='password'
                className='form-control'
                value={user.password}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='text'
                placeholder='Email'
                name='email'
                className='form-control'
                value={user.email}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='playerTarget'>User Target</label>
              <input 
                type='text'
                placeholder='User Target'
                name="playerTarget"
                className='form-control'
                value={user.playerTarget}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='playerEliminations'>User Eliminations</label>
              <textarea
                type='text'
                placeholder='Player Eliminations'
                name='playerEliminations'
                className='form-control'
                value={user.playerEliminations}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='playerStatus'>User Status</label>
              <input
                type='text'
                placeholder='User Status'
                name='playerStatus'
                className='form-control'
                value={user.playerStatus}
                onChange={onChange}
              />
            </div>
            <br />

            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
            >
              Update User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateUserInfo;