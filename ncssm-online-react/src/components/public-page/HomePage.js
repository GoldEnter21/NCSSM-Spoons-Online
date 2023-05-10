import React from 'react';
// import { useState, useEffect } from 'react';
import BinarySearchTree from '../../javascript-functions/BinarySearchTree';
import { Link } from 'react-router-dom';
import UserCard from '../admin-page/UserCard';
import GetUserList from "../../javascript-functions/database-access.mjs";

class HomePage extends React.Component {
    render() {
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
                        <UserCard user={mostElims} key={0} />
                    </div>
                </div>
            </div>
        );
    }
}

class EliminationTree extends React.Component {

    compareEliminations(player1, player2) {
        return player1.playerEliminations - player2.playerEliminations;
    }  

    elims = new BinarySearchTree(compareEliminations);

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