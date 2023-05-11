// import GetUserList from './database-access.mjs';
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
        while (this.props.userList.length === 0) {
            return (
                <div>
                    Loading...
                    {this.props.userList.length}
                </div>
            );
        }
        this.assassinGraph = new assassinGraph(this.props.userList, 1);
        // WRITE METHODS FOR THE ASSASSIN GRAPH HERE
        this.assassinGraph.addAllPlayers();
        return (
            <div>
                <p>LIST:  {this.assassinGraph.setAsList()}</p>
                <p>USERLIST:  {this.props.userList[0].firstName}</p>
            </div>
        );
        
    }
}

// The assassinGraph class will be called from the CallerOfGraphs class above which will have access to the database
export class assassinGraph extends graph {

    constructor(userList, numOfPlayers) {
        super(numOfPlayers);
        // this.AdjList = super(AdjList);
        this.userList = userList;
        // this.userList[0].firstName <= The firstName of the first user in the userList
        this.numOfVertices = numOfPlayers;  
    }

    addPlayer(player) {
        this.addVertex(player);
    }

    addAllPlayers(){
        for(let i = 0; i<this.userList.length;i++){
            // console.log(this.userList[i].firstName);
            this.addVertex(this.userList[i]);
        }
        for (let i=0; i<this.userList.length-1; i++) {
            this.setTarget(this.userList[i], this.userList[i+1]);
        }
        this.setTarget(this.userList[this.userList.length - 1], this.userList[0]);
    }

    setTarget(player, target){
        if(this.userList.includes(target) && this.userList.includes(player)){
            player.target = target;
            this.addEdge(player, target, "vToW");
            console.log("succeeded");
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
        for (let [key, value] of this.AdjList) {
            console.log("bru" + key.firstName + " = " + value.firstName);
        }
        // console.log("DFLK:" + [...this.AdjList.entries()]);
        let graphList = new Array();
        let firstPlayer = Array.from(this.AdjList.keys().next().value)[0]; 
        console.log("!");
        let currPlayer = this.AdjList.get(firstPlayer); 
        console.log("!!");
        graphList.push(firstPlayer)
        console.log("C: " + this.AdjList.get(firstPlayer));
        console.log("K:" + this.AdjList.keys().next().value);
        while (currPlayer !== firstPlayer) {
            graphList.push(currPlayer)
            currPlayer = this.AdjList.get(currPlayer)[0];
            console.log("D: " + this.AdjList.get(currPlayer));
        }

        return graphList;
    }

    // returnToCaller() {
    //     // Try to return the graph as a list
    //     return this.setAsList();
    // }

}

export default CallerOfGraphs