import graph from "./graph.js";
import React from "react";
import "../../src/App.css";

import axios from "axios";

export const AssassinCard = (props) => {
  const user = props.user;
  // console.log("U: " + user.firstName + ":" + user.target.firstName);
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

let doTester = function (data, id) {
  const putData = {
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
    email: data.email,
    playerEliminations: data.playerEliminations,
    playerStatus: data.playerStatus,
    playerTarget: id,
  };
  axios
    .put(`http://localhost:8082/api/users/${data._id}`, putData)
    .catch((err) => {
      console.log("Error in UpdateUserInfo!");
    });
};

class CallerOfGraphs extends React.Component {
  constructor(props) {
    super(props);
    this.assassinGraph = new assassinGraph(this.props.userList, 1, doTester);
    this.assassinList = [];
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
    this.assassinGraph = new assassinGraph(this.props.userList, 1);
    this.assassinGraph.addAllPlayers();

    this.assassinList = this.assassinGraph
      .setAsList()
      .map((user, k) => <AssassinCard user={user} key={k} />);
    if (this.props.showGraph === true) {
      return (
        <div>
          <div className="compact-list">{this.assassinList}</div>
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
  constructor(userList, numOfPlayers, changePlayer) {
    super(numOfPlayers);
    this.userList = userList;
    this.numOfVertices = numOfPlayers;
    this.changePlayer = doTester;
  }

  addPlayer(player) {
    this.addVertex(player);
  }

  addAllPlayers() {
    for (let i = 0; i < this.userList.length; i++) {
      this.addVertex(this.userList[i]);
    }
    for (let i = 0; i < this.userList.length - 1; i++) {
      this.setTarget(this.userList[i], this.userList[i + 1]);
    }
    this.setTarget(this.userList[this.userList.length - 1], this.userList[0]);
  }

  setTarget(player, target) {
    if (this.userList.includes(target) && this.userList.includes(player)) {
      player.target = target;
      this.addEdge(player, target, "vToW");
      this.changePlayer(player, target._id);
    } else {
      console.log("failed" + this.userList);
    }
  }

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

  setAsList() {
    // var test = this.AdjList;
    // for (let [key, value] of this.AdjList) {
    //     console.log("bru" + key.firstName + " = " + value.firstName);
    // }
    // console.log("DFLK:" + [...this.AdjList.entries()]);
    // let graphList = new Array();
    let graphList = [];
    let firstPlayer = this.AdjList.keys().next().value;
    // console.log("!" + this.AdjList.get(this.AdjList.keys().next().value)[0].firstName); // firstName of target
    // console.log("F: " + firstPlayer.firstName);  // firstPlayer firstname
    let currPlayer = this.AdjList.get(this.AdjList.keys().next().value)[0];
    // console.log("!!" + currPlayer);
    graphList.push(firstPlayer);
    // console.log("C: " + this.AdjList.get(firstPlayer));
    // console.log("K:" + this.AdjList.keys().next().value);
    while (currPlayer !== firstPlayer) {
      graphList.push(currPlayer);
      currPlayer = this.AdjList.get(currPlayer)[0];
      // console.log("D: " + this.AdjList.get(currPlayer)[0].firstName);
    }
    // console.log("FINISHED");
    // console.log(graphList);
    return graphList;
  }

}

export default CallerOfGraphs;
