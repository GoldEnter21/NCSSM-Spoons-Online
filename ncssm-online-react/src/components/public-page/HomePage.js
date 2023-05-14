import React from "react";
// import { useState, useEffect } from 'react';
import BinarySearchTree from "../../javascript-functions/BinarySearchTree";
import { Link } from "react-router-dom";
import GetUserList, {
  GetUser,
} from "../../javascript-functions/database-access.mjs";

function compareEliminations(player1, player2) {
  return player1.playerEliminations - player2.playerEliminations;
}

var elims = new BinarySearchTree(compareEliminations);

class HomePage extends React.Component {
  // constructor(props) {
  //     super(props);
  // }
    showBestUser() {
        if (elims.findMaxNode().playerEliminations === 0) {
            return (
                <div>
                    No Best Player yet, keep playing to become the best player!
                </div>
            )
        }
        return (
            <div>
                Best Player is <strong>{elims.findMaxNode().firstName} {elims.findMaxNode().lastName}</strong> with{" "}
              {elims.findMaxNode().playerEliminations} eliminations
            </div>
        );
    }

  render() {
    var d = 0;
    if (this.props.userList.length === 0 && d <= 100) {
      return <div>Loading...</div>;
    }

    // console.log("Some: " + this.props.userList.length);

    for (let i = 0; i < this.props.userList.length; i++) {
      // console.log("Hello: " + this.props.userList[i].firstName);
      elims.insert(this.props.userList[i]);
    }
    // console.log("FS: " + elims.findMaxNode().firstName);

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
            <div className="col-md-11">
              {this.showBestUser()}
            </div>
          </div>
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
    // player looks like player{}
    // console.log("HI");
    // TODO: find the node with the id of {player}
    // TODO: Do this stuff in database-access.mjs
    console.log("GU: " + GetUser(player, playerT));
    // var data = GetUser(playerT).playerTarget;  // gets the playerTarget user
    // RemoveUser(playerT);
    // ChangeUser({
    //     "role": player.role,
    //     "firstName": player.firstName,
    //     "lastName": player.lastName,
    //     "password": player.password,
    //     "email": player.email,
    //     "playerEliminations": player.playerEliminations + 1,
    //     "playerStatus": "alive",
    //     "playerTarget": data
    // }, player)
    // console.log("PLA: " + player);
    // elims.remove(player);
  }

  getBestUser() {
    return elims.findMaxNode();
  }
}

export default HomePage;
