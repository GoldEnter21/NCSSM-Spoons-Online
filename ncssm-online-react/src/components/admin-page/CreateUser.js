import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
/**
 * Makes a new user, no props
 * @param {*} props 
 * @returns a form that a user will fill out for the user it will create
 */
const CreateUser = (props) => {
  // Define the state with useState hook
  const navigate = useNavigate();
  const [user, setUser] = useState({
    role:'',
    firstName: '',
    lastName: '',
    email: '',
    hall: '',
    password: '',
    playerEliminations: 0,
    playerStatus: 'alive',
    playerTarget: '',
    alias: ''
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post('https://express-backend.fly.dev/api/users', user)
      .then((res) => {
        console.log("DFK: " + user.playerEliminations);
        setUser({
            role: '',
            firstName: '',
            lastName: '',
            email: '',
            hall: '',
            password: '',
            playerEliminations: 0,
            playerStatus: '',
            playerTarget: '',
            alias: '',
            verification: 'true'
        });

        // Push to /
        navigate('/');
      })
      .catch((err) => {
        console.log('Error in CreateUser!');
      });
  };

  return (
    <div className='CreateUser'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/admin-only' className='btn btn-outline-warning float-left'>
              Show User List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Add User</h1>
            <p className='lead text-center'>Create new user</p>

            <form noValidate onSubmit={onSubmit}>
            <div className='form-group'>
                <input
                  type='text'
                  placeholder='Role'
                  name='role'
                  className='form-control'
                  value={user.role}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='First Name'
                  name='firstName'
                  className='form-control'
                  value={user.firstName}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Last Name'
                  name='lastName'
                  className='form-control'
                  value={user.lastName}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input 
                  type='text'
                  placeholder='Password'
                  name='password'
                  className='form-control'
                  value={user.password}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='Email'
                  name='email'
                  className='form-control'
                  value={user.email}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='text'
                  placeholder='playerStatus'
                  name='playerStatus'
                  className='form-control'
                  value={user.playerStatus}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input 
                  type='text'
                  placeholder='playerTarget'
                  name='playerTarget'
                  className='form-control'
                  value={user.playerTarget}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input 
                  type='text'
                  placeholder='alias'
                  name='alias'
                  className='form-control'
                  value={user.alias}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input 
                  type='text'
                  placeholder='hall'
                  name='hall'
                  className='form-control'
                  value={user.hall}
                  onChange={onChange}
                />
              </div>

              <input
                type='submit'
                className='btn btn-outline-warning btn-block mt-4'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;