import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const CreateUser = (props) => {
  // Define the state with useState hook
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    playerEliminations: 0,
    playerIsAlive: true,
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8082/api/users', user)
      .then((res) => {
        setUser({
            firstName: '',
            lastName: '',
            email: '',
            playerEliminations: null,
            playerIsAlive: true,
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
            <Link to='/' className='btn btn-outline-warning float-left'>
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
                  placeholder='First Name'
                  name='firstName'
                  className='form-control'
                  value={user.firstName}
                  onChange={onChange}
                />
              </div>
              <br />

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
                  placeholder='Email'
                  name='email'
                  className='form-control'
                  value={user.email}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='number'
                  placeholder='Number of eliminations so far'
                  name='playerEliminations'
                  className='form-control'
                  value={user.playerEliminations}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <input
                  type='checkbox'
                  placeholder='playerIsAlive'
                  name='playerIsAlive'
                  className='form-control'
                  value={user.playerIsAlive}
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