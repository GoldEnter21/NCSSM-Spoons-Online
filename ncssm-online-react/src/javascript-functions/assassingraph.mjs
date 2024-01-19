import graph from "./graph.js";
import React from "react";
import "../../src/App.css";

import axios from "axios";

/**
 * Small card showing a user's name and their target's name
 * @param {PlayerObject} props 
 * @returns 
 */
export const AssassinCard = (props) => {
  const user = props.user;
  return (
    <div className="small-card-container">
      <div className="row">
        <div>
          <h4>{user.firstName}</h4>
          <p>Target: {user.target.firstName}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Changes the id and user's data
 * @param {PlayerObject} data 
 * @param {_id} id 
 */
let doTester = function (data, id) {
  const putData = {
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
    email: data.email,
    playerEliminations: data.playerEliminations,
    playerStatus: data.playerStatus,
    // playerTarget: id,
  };
  axios
    .put(`https://express-backend.fly.dev/api/users/${data._id}`, putData)
    .catch((err) => {
      console.log("Error in doTester!");
    });
};

/**
 * Calls the assassin graph and uses the class while passing in functions
 */
class CallerOfGraphs extends React.Component {
  constructor(props) {
    super(props);
    this.assassinGraph = new assassinGraph(this.props.userList, 1, doTester)
    this.assassinList = [];
    this.changePlayer = doTester;
  }

  render() {
    while (this.props.userList.length === 0) {
      return (
        <div>
          Loading...
          {this.props.userList.length}
        </div>
      );
    }

    // var eyeD;
    // var fakeplayer;
    // for (let i = 0; i < this.userList.length; i++) {
    //   if (this.userList[i]["playerStatus"] === "dead") {
    //     eyeD = this.userList[i]["_id"]
    //     fakeplayer = this.userList[i]
    //     for (let j = 0; j < this.userList.length; j++) {
    //       if(this.userList[i]["playerTarget"] === eyeD) {
    //         console.log("found!")
    //         this.changePlayer(
    //           {
    //             playerTarget: eyeD.playerTarget,
    //           },
    //           this.userList[i]["_id"]
    //         )
    //       }
    //     }
    //   }
    // }

    // Initializing the assassin graph
    // this.assassinGraph = new assassinGraph(this.props.userList, 1);
    // this.assassinGraph.addAllPlayers();
    // // Adding all of the formatted users to one variable
    // this.assassinList = this.assassinGraph
    //   .setAsList()
    //   .map((user, k) => <AssassinCard user={user} key={k} />);

    // if this evaluates to false, it is for the purpose of updating data on the user's side
    if (this.props.showGraph === true) {
      return (
        <div>
          {/* <div className="compact-list">{this.assassinList}</div> */}
          <p> No longer available :( </p>
        </div>
      );
    } else {
      return (
        <div className="text-dark">
          <hr />
          .
        </div>
      );
    }
  }
}

// The assassinGraph class will be called from the CallerOfGraphs class above which will have access to the database
export class assassinGraph extends graph {
  constructor(allUsers, numOfPlayers, changePlayer) {
    super(numOfPlayers);
    const userListP = [];
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i]["playerStatus"] === "alive"){
        userListP.push(allUsers[i]);
      }
    }
    this.userList = userListP;
    this.numOfVertices = numOfPlayers;
    this.changePlayer = doTester;
  }
  /**
   * Adds a vertex with the player object
   * @param {PlayerObject} player 
   */
  addPlayer(player) {
    this.addVertex(player);
  }

  /**
   * TODO: make the setTarget assign a random user instead of the user after the current user in the database like it is now
   * Adds and sets targets for all players, right now the target for a player is the player after it in the database
   */
  addAllPlayers() {
    for (let i = 0; i < this.userList.length; i++) {
      this.addVertex(this.userList[i]);
    }
    for (let i = 0; i < this.userList.length; i++) {
      this.setTarget(this.userList[i], this.userList[i + 1]);
    }
    this.setTarget(this.userList[this.userList.length - 1], this.userList[0]);
  }

  /**
   * Sets the target of a player to the inputted target 
   * @param {PlayerObject} player 
   * @param {PlayerObject} target 
   */
  setTarget(player, target) {
    if (this.userList.includes(target) && this.userList.includes(player)) {
      player.target = target;
      this.addEdge(player, target, "vToW");
      this.changePlayer(player, target._id);
    } else {
      console.log("failed" + this.userList);
    }
  }

  /**
   * Will eliminate a player while adding the edge to connect the nodes
   * @param {PlayerObject} d 
   */
  eliminatePlayer(d) {
    let eliminator, newTarget;
    for (let [player, target] of this.userList) {
      if (target.includes(d)) {
        eliminator = player;
      }
      if (player.equals(d)) {
        newTarget = target[0];
        break;
      }
    }
    this.addEdge(eliminator, newTarget);
    this.removeVertex(d);
  }

  /**
   * Converts the graph into a list so it can be modified easier outside of the class
   * @returns a list of all nodes
   */
  setAsList() {
    let graphList = [];
    let firstPlayer = this.AdjList.keys().next().value;
    let currPlayer = this.AdjList.get(this.AdjList.keys().next().value)[0];
    graphList.push(firstPlayer);
    while (currPlayer !== firstPlayer) {
      graphList.push(currPlayer);
      currPlayer = this.AdjList.get(currPlayer)[0];
    }
    return graphList;
  }

}

export default CallerOfGraphs;
