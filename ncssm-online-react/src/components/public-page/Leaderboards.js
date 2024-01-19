import React from "react";
import "../../styles/leaderboards.css";
/**
 * Is the main HomePage and shows related information
 * @param {userList, locationList} props
 */
class Leaderboards extends React.Component {
  render() {
    return (
      <div className="Map2">
        <div className="container">
            <div className="comingl">
                <p> Unfortunately, you can't have leaderboards without players. . . </p>
                <p> (Or a game to play) </p>
            </div>
            <div style={{textAlign: "center"}}>
              <img src='SadKitty.png' display= "block" width= "320rem"></img>
            </div>
        </div>
        <br />
      </div>
    );
  }
}

export default Leaderboards;
