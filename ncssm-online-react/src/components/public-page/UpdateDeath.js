import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { assassinGraph } from "../../javascript-functions/assassingraph.mjs";
import { EliminationTree } from "../../components/public-page/HomePage.js"
import { AddLocation } from "../../javascript-functions/database-access.mjs";

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

  const [location, setLocation] = useState({
    location: "",
    date: "",
    playerEliminator: "",
    playerKilled: ""
  })


  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/users/`)
      .then((res) => {
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
    setLocation({...location, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    AddLocation(location.location, location.date, location.playerEliminator, location.playerKilled);
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
            
            <div className="form-group">
              <div name="location"className="custom-select">
                <select name="location"onChange={onChange}>
                  <option name="location" value="">Choose a Role</option>
                  <option name="location" value="art-studio">Art Studio</option>
                  <option name="location" value="baseball-field">Baseball Field</option>
                  <option name="location" value="beall">Beall</option>
                  <option name="location" value="bike-shed">Bike Shed</option>
                  <option name="location" value="bryan">Bryan</option>
                  <option name="location" value="bryan-classrooms">Bryan Classrooms</option>
                  <option name="location" value="bryan-etc-hallway">Bryan-ETC Hallway</option>
                  <option name="location" value="bryan-lobby">Bryan Lobby</option>
                  <option name="location" value="etc">ETC</option>
                  <option name="location" value="hill">Hill</option>
                  <option name="location" value="hill-street">Hill Street</option>
                  <option name="location" value="hunt-west">Hunt West</option>
                  <option name="location" value="hunt-east">Hunt East</option>
                  <option name="location" value="parking-lot">Large Parking Lot</option>
                  <option name="location" value="pec">PEC</option>
                  <option name="location" value="reynolds">Reynolds</option>
                  <option name="location" value="reynolds-breezeway">Reynolds Breezeway</option>
                  <option name="location" value="royall">Royall</option>
                  <option name="location" value="soccer-field">Soccer Field</option>
                  <option name="location" value="swings">Swings</option>
                  <option name="location" value="tennis-courts">Tennis Courts</option>
                  <option name="location" value="volleyball">Volleyball Court</option>
                  <option name="location" value="watts">Watts</option>
                  <option name="location" value="watts-circle">Watts Circle</option>
                  <option name="location" value="woolworth">Woolworth</option>
                </select>
              </div>
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="text"
                placeholder="Date"
                name="date"
                className="form-control"
                value={location.date}
                onChange={onChange}
              />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="playerEliminator">Player that got an Elimination</label>
              <input
                type="text"
                placeholder="playerEliminator"
                name="playerEliminator"
                className="form-control"
                value={location.playerEliminator}
                onChange={onChange}
              />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="playerKilled">Player that got Eliminated</label>
              <input
                type="text"
                placeholder="playerKilled"
                name="playerKilled"
                className="form-control"
                value={location.playerKilled}
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
