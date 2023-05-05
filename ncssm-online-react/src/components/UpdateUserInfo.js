import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function UpdateUserInfo(props) {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    playerEliminations: 0,
    playerIsAlive: true,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/users/${id}`)
      .then((res) => {
        setUser({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            playerEliminations: res.data.playerEliminations,
            playerIsAlive: res.data.playerIsAlive,
        });
      })
      .catch((err) => {
        console.log('Error from UpdateUserInfo');
      });
  }, [id]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        playerEliminations: user.playerEliminations,
        playerIsAlive: user.playerIsAlive,
    };

    axios
      .put(`http://localhost:8082/api/users/${id}`, data)
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
            <Link to='/' className='btn btn-outline-warning float-left'>
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
              <label htmlFor='playerIsAlive'>User Status</label>
              <input
                type='text'
                placeholder='User Status'
                name='playerIsAlive'
                className='form-control'
                value={user.playerIsAlive}
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