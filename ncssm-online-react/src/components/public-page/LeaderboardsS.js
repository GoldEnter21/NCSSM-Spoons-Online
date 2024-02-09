import React, { useState, useEffect } from "react";
import "../../App.css";
import "../../styles/showusers.css";

/**
 * Used to show all of the users on the admin-page
 * @returns all of the users and some information about them
 */
const LeaderboardsS = ()  => {

  return (
    <div className="Leaderboards2">
      <div className="container">
        <div className="row">
          <div style={{width: "10%"}} className="col"></div>
          <div style={{width: "40%"}} className="col">
            <p className="titlel2" ><a href="/leaderboardsplayers">Players ➚</a></p>
          </div>
          <div style={{width: "40%"}} className="col">
            <p className="titlel2" ><a href="/leaderboardsdays">Days ➚</a></p>
          </div>
          <div style={{width: "10%"}} className="col"></div>
        </div>
        </div>
        <p className="titlel23"> Click one of the leaderboard categories above to get started! </p>
      </div>
  );
}

export default LeaderboardsS;