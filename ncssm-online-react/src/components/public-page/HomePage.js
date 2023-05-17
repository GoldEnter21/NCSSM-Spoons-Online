import React from "react";
// import { useState, useEffect } from 'react';
import BinarySearchTree from "../../javascript-functions/BinarySearchTree";
import { Link } from "react-router-dom";
import GetUserList, {
  GetUser,
} from "../../javascript-functions/database-access.mjs";
import "../../styles/map.css"
function compareEliminations(player1, player2) {
  return player1.playerEliminations - player2.playerEliminations;
}

var elims = new BinarySearchTree(compareEliminations);


class HomePage extends React.Component {

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

  markerTemplate(location, date, playerEliminator, playerKilled, key) {
    return (
      <div key={key}>
        <h1>{location}</h1>
        <p>On {date}</p>
        <p>{playerEliminator} eliminated {playerKilled}</p>
      </div>
    );
  }

  showEliminationMap() {
    const destination = "hill"

    const locationList = this.props.locationList.map((elim, k) => this.markerTemplate(elim.location, elim.date, elim.playerEliminator, elim.playerKilled, k))

    return (
      <div className="text-center parent">
        <img className="ncssm-map" src="ncssm_map.png" alt="NCSSM MAP" height="750" width="1200" />
        <div>
          <img className={destination} src="https://upload.wikimedia.org/wikipedia/en/3/39/Red_triangle_with_thick_white_border.svg" alt="Red Triangle" height="15" width="15" />
        </div>
        <p>Elimination Map</p>
        <div className="list">
          {locationList}
        </div>
      </div>
    );
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

        <div className="container">
          {this.showEliminationMap()}
        </div>

        <div>
          {this.props.locationList[0].location}
        </div>
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
