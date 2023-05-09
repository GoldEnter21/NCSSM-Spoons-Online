import GetUserList from './database-access.mjs';
import graph from './graph.js';
import React from 'react';
// function GetUsers() {
//     var userList = GetUserList();
//     // Checking to see if the server has retrieved the data
//     while (userList[0] == null) {
//         userList = GetUsers();
//     }
//     if (userList[0] != null) {
//         console.log(userList[0].firstName);
//         return userList;
//     }
// }

class CallerOfGraphs extends React.Component {
    constructor(props) {
        super(props);
        this.assassinGraph = new assassinGraph(this.props.userList, 1);
    }
    // Wherever you use the graph call something like <CallerOfGraphs userList=GetUserList() />


    // userList = users.map((user, k) => <UserCard user={user} key={k} />);

    render() {
        if (this.props.userList.firstName) {
            console.log("HIERE");
            return (
                <div>
                    Loading...
                </div>
            );
        }
        else {
            return (
                <div>
                    <p>HI</p>
                    <p>{this.props.userList.length}</p>
                    <p>{this.assassinGraph.returnToCaller()}</p>
                </div>
            );
        }
    }
}

// The assassinGraph class will be called from the CallerOfGraphs class above which will have access to the database
export class assassinGraph extends graph {

    constructor(userList, numOfPlayers) {
        super(numOfPlayers);
        // super(AdjList);
        this.userList = userList;
        // this.userList[0].firstName <= The firstName of the first user in the userList
        this.numOfVertices = numOfPlayers;
    }

    addPlayer(player) {
    super.addVertex(player);
    }

    addAllPlayers(){
        for(let i = 0; i<this.userList.length();i++){
            super.addVertex(this.userList[i]);
        }
    }

    setTarget(player, target){
        if(this.userList.includes(target) && this.userList.includes(player)){
            player.target = target;
        }
    
        else{
            
        }
    }

    eliminatePlayer(d) {
        for (let [player, target] of map) {
            if (target.includes(d)) {
                eliminator = player;
            }
            if (player.equals(d)) {
                newTarget = target[0];
                break;
            }
        }
        super.addEdge(eliminator, newTarget);
        super.removeVertex(d);
    }

    returnToCaller() {
        return this.userList[0].firstName;
    }

}

export default CallerOfGraphs