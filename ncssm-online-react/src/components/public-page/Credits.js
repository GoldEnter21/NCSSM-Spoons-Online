import React from "react";
import "../../styles/credits.css";
/**
 * Is the main HomePage and shows related information
 * @param {userList, locationList} props
 */
class Credits extends React.Component {
  render() {
    return (
      <div className="Credits">
        <div className="container">
            <div className="comingc">
                <p> The <i style={{color: "white"}}>Spoons Development Project</i> and website was founded and developed by <b style={{color: "#fddc5c"}}> Joy Niranjan </b></p>
                <p>`</p>
                <p> In collaboration with 2023's Spoons Master - <b style={{color: "#fddc5c"}}> Lily Mac </b></p>
                <p>`</p>
                <p> Uhhhhhhh more credits and acknowledgments coming soon!!</p>
            </div>
        </div>
        <br />
      </div>
    );
  }
}

export default Credits;
