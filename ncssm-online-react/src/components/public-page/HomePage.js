import React from "react";
// import { useState, useEffect } from 'react';
import BinarySearchTree from "../../javascript-functions/BinarySearchTree";
import { Link } from "react-router-dom";
import GetUserList, {
  GetUser,
} from "../../javascript-functions/database-access.mjs";
import "../../styles/map.css";
function compareEliminations(player1, player2) {
  return player1.playerEliminations - player2.playerEliminations;
}

var elims = new BinarySearchTree(compareEliminations);

class HomePage extends React.Component {
  state = {
    showLocation: ""
  }

  changeLocation = (loc) => {
    console.log("LOC: " + loc);
    this.setState({
      showLocation: loc
    })
  }

  constructor(props) {
    super(props);
    this.locationEliminationList = {};
  }
  
  MarkerTemplate = (props) => {
    var data = [props.location, props.date, props.playerEliminator, props.playerKilled];
    if (this.locationEliminationList[props.location] === undefined) {
      this.locationEliminationList[props.location] = [data]
    }
    else {
      let locationList = this.locationEliminationList[props.location];
      var foundDuplicate = Boolean(false);

      for (let point of locationList) {
        if (point[1] === data[1]) {
          if ((point[0]===data[0]) && (point[2] === data[2]) && (point[3] === data[3])) {
            // console.log("Duplicate: " + point + ":" + data);
            foundDuplicate = true;
          }
        }
      }
      if (!foundDuplicate) {
        this.locationEliminationList[props.location].push(data);
      }
    }
    return (
      <img onClick={this.setShowLocation.bind(this, props.location)}
        className={props.location}
        src="https://upload.wikimedia.org/wikipedia/en/3/39/Red_triangle_with_thick_white_border.svg"
        alt={props.location}
        height="15"
        width="15"
      />
    );
  };

  setShowLocation(location) {
    this.changeLocation(location);
    console.log("Set showLocation to : " + location);
  }

  showBestUser() {
    if (elims.findMaxNode().playerEliminations === 0) {
      return (
        <div>No Best Player yet, keep playing to become the best player!</div>
      );
    }
    return (
      <div>
        Best Player is{" "}
        <strong>
          {elims.findMaxNode().firstName} {elims.findMaxNode().lastName}
        </strong>{" "}
        with {elims.findMaxNode().playerEliminations} eliminations
      </div>
    );
  }

  showEliminationMap() {
    if (this.props.locationList.length === 0) {
      return <div>Loading...</div>;
    }
    console.log(this.props.locationList);
    const locationList = this.props.locationList.map((elim, k) => (
      <this.MarkerTemplate
        location={elim.location}
        date={elim.date}
        playerEliminator={elim.playerEliminator}
        playerKilled={elim.playerKilled}
        key={k}
      />
    ));

    return (
      <div className="text-center parent">
        <img
          className="ncssm-map"
          src="ncssm_map.png"
          alt="NCSSM MAP"
          height="750"
          width="1200"
        />
        <p>Elimination Map</p>
        <div>{locationList}</div>
      </div>
    );
  }

  LocationDisplay = (props) => {
    return (
      <div>
        <h1>{props.location}</h1>
        <p>On {props.date}</p>
        <p>
          {props.playerEliminator} eliminated {props.playerKilled}
        </p>
      </div>
    );
  }

  showElimsForLocation() {
    // console.log(this.locationEliminationList["hill"][0][1]);
    var location = this.state.showLocation;
    // console.log(location);
    if (location === "") {
      return (
        <div>
          Click on a Marker to see the Eliminations that occurred there
        </div>
      );
    }
    console.log(this.locationEliminationList[location]);
    const listOfData = this.locationEliminationList[location].map((elim, k) => (
      <this.LocationDisplay 
        location = {elim[0]}
        date = {elim[1]}
        playerEliminator = {elim[2]}
        playerKilled = {elim[3]}
        key={k}
      />
    ));
    // console.log(listOfData);
    return listOfData;
  }

  render() {
    var d = 0;
    if (this.props.userList.length === 0 && d <= 100) {
      return <div>Loading...</div>;
    }

    for (let i = 0; i < this.props.userList.length; i++) {
      elims.insert(this.props.userList[i]);
    }

    return (
      <div className="HomePage">
        <div className="container">
          <div className="row">
            <div className="col-md-2 mt-3">
              <h4>Day 1: BloodBath </h4>
            </div>
            <div className="col-md-8 text-center">
              <h1> NCSSM Spoons Online </h1>
            </div>
            <div className="col-md-2">
              <Link
                to="/register-user"
                className="btn btn-outline-warning float-right mt-3"
              >
                + Register or Sign In Here
              </Link>
            </div>
          </div>
          <br />
          <hr />
          <div className="row">
            <div className="col-md-11">{this.showBestUser()}</div>
          </div>
        </div>
        <br />

        <div className="container">{this.showEliminationMap()}</div>
        <br />
        <div className="container">
          <div className="row">
            <div className="list">
              {this.showElimsForLocation()}
              <br />
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export class EliminationTree extends React.Component {
  makeGraph() {
    var userList = GetUserList();
    for (let i = 0; i < userList.length; i++) {
      elims.insert(userList[i]);
    }
  }

  deleteNode(player, playerT) {
    console.log("GU: " + GetUser(player, playerT));
  }

  getBestUser() {
    return elims.findMaxNode();
  }
}

export default HomePage;
