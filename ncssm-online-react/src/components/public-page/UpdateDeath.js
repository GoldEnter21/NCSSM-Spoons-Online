import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EliminationTree } from "../../components/public-page/HomePage.js"
import { AddLocation } from "../../javascript-functions/database-access.mjs";

/**
 * Logs an elimination, no real props
 * @param {*} props 
 * @returns a form to log a player death
 */
function UpdatePlayersElimination(props) {
  // States for the user and location related to the elimination, the user is the person who is logging the elimination
  const [deathInfo, setDeath] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    firstNameK: "",
    lastNameK: "",
    firstNameT: "",
    lastNameT: "",
    idKiller: "",
    idKilled:"",
    idTargetKey:""
  });

  const [location, setLocation] = useState({
    location: ""
  })

  /**
   * Used to update the specific user's state information without their id being known
   */
  // useEffect(() => {
    
  // });

  const onChange = (e) => {
    setDeath({ ...deathInfo, [e.target.name]: e.target.value });
    setLocation({...location, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  // Adding the location of the death to the database and deleting the node plus more in emTree

  var userInfo = [];
  var user_id = "";
  var firstName = "";
  var lastName = "";
  var elims;

  const onSubmit = async (e) => {
    e.preventDefault();
    // let emTree = new EliminationTree();
    // emTree.deleteNode(user, user.playerTarget);
    var validKilled = false;
    var validKillKilled = false;
    var killedId = "";
    var killedtargetId = "";
    await axios
      .get(`https://express-backend.fly.dev/api/users/`)
      .then((res) => {
        userInfo = res.data
      })
      .then(() => {
        userInfo.forEach((dbUser) => {
          if (dbUser.firstName === deathInfo.firstNameK) {
            if (dbUser.lastName === deathInfo.lastNameK) {
              validKilled = true;
              killedId = dbUser._id;
              deathInfo.idKilled = killedId;
              console.log(deathInfo);
            }
          }
          if (dbUser.firstName === deathInfo.firstNameT) {
            if (dbUser.lastName === deathInfo.lastNameT) {
              validKillKilled = true;
              killedtargetId = dbUser._id;
              deathInfo.idTargetKey = killedtargetId;
            }
          }
        })
      })
    if (validKillKilled && validKilled) {
    await axios
      .get(`https://express-backend.fly.dev/api/users/`)
      .then((res) => {
        userInfo = res.data;

      })
      .then(() => {
        userInfo.forEach((dbUser) => {
          if (dbUser.firstName === deathInfo.firstNameK) {
            if (dbUser.lastName === deathInfo.lastNameK) {
              user_id = dbUser._id;
              var y = new Date();
              var x = new Date("2024-02-11T23:59:59");
              var secs = Math.abs(x.getTime() - y.getTime())/1000;
              var days = Math.floor(secs/ 86400)
              var hours   = Math.floor(secs / 3600) % 24;
              var minutes = Math.floor(secs / 60) % 60;
              var seconds = Math.floor(secs % 60);
              var overall = [days, hours, minutes, seconds]
                  .map(v => ('' + v).padStart(2, '0'))
                  .filter((v,i) => v !== '00' || i > 0)
                  .join(':');
              axios.put(`https://express-backend.fly.dev/api/users/${user_id}`, {playerStatus: overall});
            }
          }
          if (dbUser.email === deathInfo.email) {
            if (dbUser.password === deathInfo.password) {
              user_id = dbUser._id;
              firstName = dbUser.firstName;
              lastName = dbUser.lastName;
              elims = dbUser.playerEliminations;
              axios.put(`https://express-backend.fly.dev/api/users/${user_id}`, {playerEliminations: elims + 1});
              deathInfo.idKiller = user_id;
              deathInfo.firstName = firstName;
              deathInfo.lastName = lastName;
              // setLocation({...location, playerKilled: killedId });
              // setLocation({...location, playerEliminator: user_id });
              // setLocation({...location, date: "test_date" });
            }
          }
        })

      })
      .catch((err) => {
        console.log('Error from Get in UpdateDeath: ' + err.message);
      });
    AddLocation(location.location, new Date(), deathInfo.idKiller, deathInfo.idKilled, deathInfo.idTargetKey, deathInfo.firstName + " " + deathInfo.lastName, deathInfo.firstNameK + " " + deathInfo.lastNameK, deathInfo.firstNameT + " " + deathInfo.lastNameT);
    navigate(`/`);
    }
  }

  return (
    <div className="UpdatePlayersElimination">
      <div className="container">
        <div className="col-md-8 m-auto">
          <form noValidate onSubmit={onSubmit}>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                placeholder="email"
                name="email"
                className="form-control"
                value={deathInfo.email}
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
                value={deathInfo.password}
                onChange={onChange}
              />
            </div>
            <br />
            {/* These are available locations, to add one copy the <option> and change the value and white text, 
            add in map.css what you put for value */}
            <div className="form-group">
              <div name="location"className="custom-select">
                <select name="location"onChange={onChange}>
                  <option name="location" value="">Choose a Location</option>
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
              <label htmlFor="playerKilledFirstName">First Name</label>
              <input
                type="text"
                placeholder="playerKilledFirstName"
                name="firstNameK"
                className="form-control"
                value={deathInfo.firstNameK}
                onChange={onChange}
              />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="playerKilledLastName">Last Name</label>
              <input
                type="text"
                placeholder="playerKilledLastName"
                name="lastNameK"
                className="form-control"
                value={deathInfo.lastNameK}
                onChange={onChange}
              />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="playerKilledTargetFirstName">First Name</label>
              <input
                type="text"
                placeholder="playerKilledTargetFirstName"
                name="firstNameT"
                className="form-control"
                value={deathInfo.firstNameT}
                onChange={onChange}
              />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="playerKilledTargetLastName">Last Name</label>
              <input
                type="text"
                placeholder="playerKilledTargetLastName"
                name="lastNameT"
                className="form-control"
                value={deathInfo.lastNameT}
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
