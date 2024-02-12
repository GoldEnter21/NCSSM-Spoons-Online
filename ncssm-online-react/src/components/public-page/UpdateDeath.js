import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EliminationTree } from "../../components/public-page/HomePage.js"
import { AddLocation } from "../../javascript-functions/database-access.mjs";
import "../../styles/signup.css";

/**
 * Logs an elimination, no real props
 * @param {*} props 
 * @returns a form to log a player death
 */
function UpdatePlayersElimination(props) {
  const [success = false, setSuccess] = useState();
  const [ver = false, setVerified] = useState();
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
    idTargetKey:"",
    placement:289
  });

  const [location, setLocation] = useState({
    location: "mars"
  })

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      setSuccess(false)
    }
    axios.get(`https://express-backend.fly.dev/api/users/${loggedInUser}`)
    .then((res) => {
      if (res.data.password === localStorage.getItem("pass")) {
          if (res.data.playerStatus !== "alive") {
            var x = new Date(res.data.deadOn)
            var y = new Date()
            y.setHours(23,59,59,999);
            if (x.toDateString() === y.toDateString()) {
              setSuccess(true)
            } else {
              setSuccess(false)
            }
          } else {
            setSuccess(true)
          }
      } else {
          setSuccess(false)
      }
      if (res.data.verified === "true"){
        setVerified(true)
      } else {
        setVerified(false)
      }
    })
  }, []);

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
        user_id = dbUser._id
        if (dbUser.playerStatus !== "alive") {
          deathInfo.placement -= 1
        }
        if (dbUser.prospectiveTarget === deathInfo.idKilled) {
          axios.put(`https://express-backend.fly.dev/api/users/${user_id}`, {prospectiveTarget: deathInfo.idTargetKey});
        }
      })
    })
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
              console.log(y)
              var x = new Date("2024-02-11T23:59:59");
              var secs = Math.abs(x.getTime() - y.getTime())/1000;
              var days = Math.floor(secs/ 86400)
              var hours   = Math.floor(secs / 3600) % 24;
              var minutes = Math.floor(secs / 60) % 60;
              var seconds = Math.floor(secs % 60);
              var overall = [days, hours, minutes, seconds]
                  .map(v => ('' + v).padStart(2, '0'))
                  .join(':');
              axios.put(`https://express-backend.fly.dev/api/users/${user_id}`, {playerStatus: overall});
              axios.put(`https://express-backend.fly.dev/api/users/${user_id}`, {deadOn: y})
              console.log(y)
              axios.put(`https://express-backend.fly.dev/api/users/${user_id}`, {placement: deathInfo.placement + 2})
            }
          }
          if (dbUser.email === deathInfo.email) {
            if (dbUser.password === deathInfo.password) {
              user_id = dbUser._id;
              firstName = dbUser.firstName;
              lastName = dbUser.lastName;
              elims = dbUser.playerEliminations;
              axios.put(`https://express-backend.fly.dev/api/users/${user_id}`, {playerEliminations: elims + 1});
              axios.put(`https://express-backend.fly.dev/api/users/${user_id}`, {prospectiveTarget: deathInfo.idTargetKey});
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
      {success ? ver ? 
      <div className="container">
        <div className="col-md-8 m-auto">
          <div className="titles">
            <p> KILL LOG </p> 
          </div>
          <form noValidate onSubmit={onSubmit}>

            <div className="question">
              <label htmlFor="email">Your Email  `</label>
              <input
                type="text"
                name="email"
                className="inputClass"
                value={deathInfo.email}
                onChange={onChange}
              />
            </div>
            <br />

            <div className="question">
              <label htmlFor="password">Your Password  `</label>
              <input
                type="text"
                name="password"
                className="inputClass"
                value={deathInfo.password}
                onChange={onChange}
              />
            </div>
            <br />
            {/* These are available locations, to add one copy the <option> and change the value and white text, 
            add in map.css what you put for value */}
            <p className="dealer"> {"< Details of the player"} <u>you just killed</u>{" >"}</p>
            <div className="question">
              <label htmlFor="playerKilledFirstName">First Name  `</label>
              <input
                type="text"
                name="firstNameK"
                className="inputClass"
                value={deathInfo.firstNameK}
                onChange={onChange}
              />
            </div>
            <br />

            <div className="question">
              <label htmlFor="playerKilledLastName">Last Name  `</label>
              <input
                type="text"
                name="lastNameK"
                className="inputClass"
                value={deathInfo.lastNameK}
                onChange={onChange}
              />
            </div>
            <br />

            <p className="dealer"> {"< Details of the player"} <u>on their spoon</u>{" >"}</p>
            <div className="question">
              <label htmlFor="playerKilledTargetFirstName">First Name  `</label>
              <input
                type="text"
                name="firstNameT"
                className="inputClass"
                value={deathInfo.firstNameT}
                onChange={onChange}
              />
            </div>
            <br />

            <div className="question">
              <label htmlFor="playerKilledTargetLastName">Last Name  `</label>
              <input
                type="text"
                name="lastNameT"
                className="inputClass"
                value={deathInfo.lastNameT}
                onChange={onChange}
              />
            </div>
            <br /> 

            <p className="dealer">{"< Optional additional details >"}</p>
            <div className="question">
              <div name="location"className="inputClass">
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

            <div className="question">
            <button
              type="submit"
              className="btn btn-outline-info btn-lg btn-block">
              Update Elimination
            </button>
            </div>
            <p className="question" style={{paddingTop:"2.5rem"}}>TIP: Write player credentials <u>exactly as it appears on their spoon,</u> accounting for capitalization and numbers</p>
            <p className="question">If you are still having issues, contact me (Joy Niranjan) on Facebook!</p>
          </form>
        </div>
      </div>: 
      <div className="container">
        <p className="loads"> Loading . . .</p>
        <p className="loads"> If you are stuck on this page forever, you shouldn't be here!</p>
      </div>: 
      <div className="container">
      <p className="loads"> Loading . . .</p>
      <p className="loads"> If you are stuck on this page forever, you shouldn't be here!</p>
    </div>}
    </div>
  );
}

export default UpdatePlayersElimination;
