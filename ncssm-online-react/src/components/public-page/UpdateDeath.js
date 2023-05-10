import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { assassinGraph } from "../../javascript-functions/assassingraph.mjs";
import { deleteNode } from "../../components/public-page/HomePage.js"

function UpdatePlayersElimination(props) {
  const [user, setUser] = useState({
    role: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    playerEliminations: 0,
    playerStatus: "",
    playerTarget: "",
  });

  // const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/users/`)
      .then((res) => {
        for (var dbUser in res.data()) {
            if (dbUser.firstName === user.firstName && dbUser.lastName === user.lastName) {
                if (dbUser.password === user.password) {
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
                }
            }
        }
      })
      .catch((err) => {
        console.log('Error from UpdateUserInfo');
      });
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // TODO: do the onSubmit for this
  const onSubmit = (e) => {
    e.preventDefault();
    deleteNode(user);

  }

  return (
    <div className="UpdatePlayersElimination">
      <div className="container">
        <div className="col-md-8 m-auto">
          <form noValidate onSubmit={onSubmit}>

            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                className="form-control"
                value={user.firstName}
                onChange={onChange}
              />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                className="form-control"
                value={user.lastName}
                onChange={onChange}
              />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                placeholder="Password"
                name="password"
                className="form-control"
                value={user.password}
                onChange={onChange}
              />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="playerTarget">User Target</label>
              <input
                type="text"
                placeholder="User Target"
                name="playerTarget"
                className="form-control"
                value={user.playerTarget}
                onChange={onChange}
              />
            </div>
            <br />

            <button
              type="submit"
              className="btn btn-outline-info btn-lg btn-block"
            >
              Update Elimination
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdatePlayersElimination;
