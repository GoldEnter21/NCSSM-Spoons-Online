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
        this.assassinGraph = new assassinGraph(this.props.userList, 1)
        this.assassinGraph.addAllPlayers();
        return (
            <div>
                <p>LIST:  {this.assassinGraph.setAsList()}</p>
                <p>USERLIST:  {this.props.userList[0].firstName}</p>
            </div>
        );
        

        // return (
        //     <div>
        //         <p>{this.assassinGraph.setAsList()}</p>
        //     </div>
        // );
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
        super.addVertex(player);
    }

    addAllPlayers(){
        for(let i = 0; i<this.userList.length;i++){
            super.addVertex(this.userList[i]);
        }
    }

    setTarget(player, target){
        if(this.userList.includes(target) && this.userList.includes(player)){
            player.target = target;
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
        super.addEdge(eliminator, newTarget);
        super.removeVertex(d);
    }

    setAsList() {
        let graphList = new Array();
        let firstPlayer = Array.from(this.AdjList.keys())[0]; 
        let currPlayer = this.AdjList.get(Array.from(this.AdjList.keys())[0]); 
        graphList.push(firstPlayer)
        while (currPlayer !== firstPlayer) {
            graphList.push(currPlayer)
            currPlayer = this.AdjList.get(currPlayer)[0];
        }

        return graphList;
    }

    // returnToCaller() {
    //     // Try to return the graph as a list
    //     return this.setAsList();
    // }

}

export default CallerOfGraphs