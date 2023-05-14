import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { assassinGraph } from "../../javascript-functions/assassingraph.mjs";
import { EliminationTree } from "../../components/public-page/HomePage.js"

function UpdatePlayersElimination(props) {
  const [user, setUser] = useState({
    id: "",
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
        // console.log(user.firstName, user.lastName, user.password);
        for (var dbUser of res.data) {
            if (dbUser.firstName === user.firstName && dbUser.lastName === user.lastName) {
                if (dbUser.password === user.password) {
                  setUser({
                      id: dbUser._id,
                      role: dbUser.role,
                      firstName: dbUser.firstName,
                      lastName: dbUser.lastName,
                      password: dbUser.password,
                      email: dbUser.email,
                      playerEliminations: dbUser.playerEliminations,
                      playerStatus: dbUser.playerStatus,
                      playerTarget: dbUser.playerTarget
                  });
                }
            }
        }
      })
      .catch((err) => {
        console.log('Error from UpdateUserInfo: ' + err.message);
      });
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // TODO: do the onSubmit for this
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    // EliminationTree.deleteNode(user.playerTarget);
    let emTree = new EliminationTree();
    emTree.deleteNode(user, user.playerTarget);
    navigate(`/`);
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
