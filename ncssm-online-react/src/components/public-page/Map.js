import React from "react";
// import { useState, useEffect } from 'react';
import BinarySearchTree from "../../javascript-functions/BinarySearchTree";
import { Link } from "react-router-dom";
import { ChangeUserTarget } from "../../javascript-functions/database-access.mjs";
import "../../styles/map.css";

/**
 * Used in the BST for comparisons based on eliminations
 * @param {PlayerObject} player1
 * @param {PlayerObject} player2
 * @returns
 */
function compareEliminations(player1, player2) {
  return player1.playerEliminations - player2.playerEliminations;
}

// The initialized BST that will be used
var elims = new BinarySearchTree(compareEliminations);

/**
 * Is the main HomePage and shows related information
 * @param {userList, locationList} props
 */
class Map extends React.Component {
  // State for the HomePage that can change often
  state = {
    showLocation: "",
  };
  // Changes the state, so when a button is clicked on the map this will save where that button was located
  changeLocation = (loc) => {
    this.setState({
      showLocation: loc,
    });
  };
  // Default Constructor
  constructor(props) {
    super(props);
    this.locationEliminationList = {};
  }
  /**
   * Adds a marker on the map if that location has not already been logged, and keeps track of which eliminations have been tracked
   * @param {location, date, playerEliminator, playerKilled} props
   * @returns the marker itself
   */
  MarkerTemplate = (props) => {
    var data = [
      props.location,
      props.date,
      props.playerEliminator,
      props.playerKilled,
    ];
    // If the location has not been logged and is not in the dictionary
    if (this.locationEliminationList[props.location] === undefined) {
      this.locationEliminationList[props.location] = [data];
    } else {
      let locationList = this.locationEliminationList[props.location];
      var foundDuplicate = Boolean(false);
      // Checking to see if that elimination has already been logged in the dictionary
      for (let point of locationList) {
        if (point[1] === data[1]) {
          if (
            point[0] === data[0] &&
            point[2] === data[2] &&
            point[3] === data[3]
          ) {
            foundDuplicate = true;
          }
        }
      }
      // Adds the elimination to the list of eliminations that occurred at a specific location
      if (!foundDuplicate) {
        this.locationEliminationList[props.location].push(data);
      }
    }
    return (
      <img
        onClick={this.changeLocation.bind(this, props.location)}
        className={props.location}
        src="https://upload.wikimedia.org/wikipedia/en/3/39/Red_triangle_with_thick_white_border.svg"
        alt={props.location}
        height="15"
        width="15"
      />
    );
  };

  /**
   * Used to make the map and all of the markers that will be placed on the map
   * @returns a list of Markers to put on the Map
   */
  showEliminationMap() {
    // if (this.props.locationList.length === 0) {
    //   return <div>The</div>;
    // }
    // Adding all of the markers to one variable
    const locationList = this.props.locationList.map((elim, k) => (
      <this.MarkerTemplate
        location={elim.location}
        date={elim.date}
        playerEliminator={elim.playerEliminator}
        playerKilled={elim.playerKilled}
        key={k}
      />
    ));

    return (
      <div className="text-center parent">
        <img
          className="ncssm-map"
          src="ncssm_map.png"
          alt="NCSSM MAP"
          height="750"
          width="1200"
        />
        <p>Elimination Map</p>
        <div>{locationList}</div>
      </div>
    );
  }

  /**
   * Used to format each location and elimination
   * @param {location, date, playerEliminator, playerKilled} props
   * @returns formatted template for the display of a location
   */
  LocationDisplay = (props) => {
    return (
      <div>
        <h1>{props.location}</h1>
        <p>On {props.date}</p>
        <p>
          {props.playerEliminator} eliminated {props.playerKilled}
        </p>
      </div>
    );
  };

  /**
   * Shows the elimination(s) that have occurred at the location specificed from the marker pressed on the map
   * @returns the eliminations from the specified location
   */
  showElimsForLocation() {
    var location = this.state.showLocation;
    // If no location has been selected
    if (location === "") {
      if (this.props.locationList.length === 0) {
        return <div>There have been no eliminations yet!</div>;
      } else {
        return (
          <div>Click on a Marker to see the Eliminations that occurred there</div>
        );
      }
    }
    // Getting all of the eliminations at the location and formatting their display
    const listOfData = this.locationEliminationList[location].map((elim, k) => (
      <this.LocationDisplay
        location={elim[0]}
        date={elim[1]}
        playerEliminator={elim[2]}
        playerKilled={elim[3]}
        key={k}
      />
    ));
    return listOfData;
  }

  render() {
    // Making sure it doesn't last forever/infinitely
    if (this.props.userList.length >= 0) {
      // Inserting all of the users into the bst
      for (let i = 0; i < this.props.userList.length; i++) {
        elims.insert(this.props.userList[i]);
      }
    }

    return (
      <div className="Map">
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
          </div>
        </div>
        <br />

        <div className="container">{this.showEliminationMap()}</div>
        <br />
        <div className="container">
          <div className="row">
            <div className="list">
              {this.showElimsForLocation()}
              <br />
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

/**
 * Class for the Elimination Tree that is used for graph
 */
export class EliminationTree extends React.Component {
  deleteNode(player, playerT) {
    console.log("GU: " + ChangeUserTarget(player, playerT));
  }
}

export default Map;
