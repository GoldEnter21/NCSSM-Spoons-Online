import React from 'react';
// import { useState, useEffect } from 'react';
import BinarySearchTree from '../../javascript-functions/BinarySearchTree';
import { Link } from 'react-router-dom';
import GetUserList from "../../javascript-functions/database-access.mjs";

function compareEliminations(player1, player2) {
    return player1.playerEliminations - player2.playerEliminations;
}  

var elims = new BinarySearchTree(compareEliminations);


class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var d = 0;
        if (this.props.userList.length === 0 && d<=100) {
            return (
                <div>
                    Loading...
                </div>
            );
        }
        
        console.log("Some: " + this.props.userList.length);
        
        for(let i = 0;i<this.props.userList.length;i++){
            // console.log("Hello: " + this.props.userList[i].firstName);
            elims.insert(this.props.userList[i]);
        }
        console.log("D: " + elims.root.data.firstName);
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
                <div className="row" >
                    <div className="col-md-11">
                        {elims.findMaxNode()}
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

    deleteNode(player) {
        // player looks like player{}

    }

    getBestUser() {
        return elims.findMaxNode();
    }
}



export default HomePage