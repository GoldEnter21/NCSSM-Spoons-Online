import React from 'react';
// import { useState, useEffect } from 'react';
import BinarySearchTree from '../../javascript-functions/BinarySearchTree';
import { Link } from 'react-router-dom';
import GetUserList, { GetUser } from "../../javascript-functions/database-access.mjs";

function compareEliminations(player1, player2) {
    return player1.playerEliminations - player2.playerEliminations;
}  

var elims = new BinarySearchTree(compareEliminations);


class HomePage extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        var d = 0;
        if (this.props.userList.length === 0 && d<=100) {
            return (
                <div>
                    Loading...
                </div>
            );
        }
        
        // console.log("Some: " + this.props.userList.length);
        
        for(let i = 0;i<this.props.userList.length;i++){
            // console.log("Hello: " + this.props.userList[i].firstName);
            elims.insert(this.props.userList[i]);
        }
        // console.log("FS: " + elims.findMaxNode().firstName);

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        Day 1: BloodBath
                    </div>
                    <div className="col-md-4">
                        <h1> NCSSM Spoons Online </h1>
                    </div>
                    <div className="col-md-4">
                        <Link
                            to='/register-user'
                            className='btn btn-outline-warning float-right'
                            >
                            + Register or Sign In Here
                        </Link>
                    </div>
                </div>
                <br />
                <div className="row" >
                    <div className="col-md-11 ">
                        Best Player is {elims.findMaxNode().firstName} with {elims.findMaxNode().playerEliminations} eliminations
                    </div>
                </div>
            </div>
        );
    }
}

export class EliminationTree extends React.Component {

    makeGraph() {
        var userList = GetUserList();
        for(let i = 0;i<userList.length;i++){
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

    tester() {
        console.log("TESTER123");
    }
}



export default HomePage