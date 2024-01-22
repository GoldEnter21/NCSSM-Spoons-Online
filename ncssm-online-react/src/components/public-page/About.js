import React from "react";
import "../../styles/about.css";
/**
 * Is the main HomePage and shows related information
 * @param {userList, locationList} props
 */
class About extends React.Component {
  render() {
    return (
      <div className="About">
        <div className="container">
            <div className="row">
                <div style={{width: "31.25%"}} className="column">
                    <div className="titlea">
                        <p> SPOONS OF GLORY </p>
                    </div>
                </div>
                <div style={{width: "18.75%"}} className="column">
                    <div className="titlea">
                        <p> ➩ </p>
                    </div>
                </div>
                <div style={{width: "50%"}} className="column">
                    <div style={{fontStyle: "italic"}}className="explainer">
                        <p> NCSSM's annual campus-wide friendly battle royale game!</p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div  className="titleaa">
                    <p> HOW TO PLAY! </p>
                </div>
            </div>
            <div className="row">
                <div className="title2a">
                    <p> For a full, thorough set of rules, <a href="https://docs.google.com/document/d/1ZsoyVH8TrBacMFaSZ1e23P9aCKf5iirZtZ6ESlX9h1Y/edit?fbclid=IwAR1DjlwRLOi-s67bKw26v4OYbFKZJZrzeBvj16vFEFtjZtv6Y9OcGiH_NQE&pli=1"><u>click here</u></a></p>
                </div>
            </div>
            <div className="row">
                <div className="explainer">
                <ol>
                    <li>
                        Sign up on our shiny new website! (The orange button on the top right, if it wasn't obvious)
                    </li>
                    <li>
                        <div className="row">
                            <div style={{width: "75%"}} className="column">
                                Recieve your spoon! Your spoon will have a target written on it. This is the player you can eliminate!
                            </div>
                            <div style={{width: "25%"}} className="column">
                                <img src='spoonexample.png' display= "block" className="images"></img>
                            </div>
                        </div>
                        
                    </li>

                    <li>
                        <div className="row">
                            <div style={{width: "75%"}} className="column">
                                Eliminate your target by <i><b>gently</b></i> tapping them on the shoulder with your spoon! To confirm the elimination, come back to this website to "log" it. Your next target will be written on <i>their</i> spoon.
                            </div>
                            <div style={{width: "25%"}} className="column">
                                <img src='elimff.png' display= "block" className="images"></img>
                            </div>
                        </div>
                    </li>
                    
                    <li>
                        <div className="row">
                            <div style={{width: "75%"}} className="column">
                                To stay safe, you can either hold your spoon such that the spoon touches both the palm of your hand <i><b>AND</b></i> the tip of your nose. . .
                            </div>
                            <div style={{width: "25%"}} className="column">
                                <img src='womanspoonf.png' display= "block" className="images"></img>
                            </div>
                        </div>
                    </li>
                    <li>
                        Or you can stay at one of the following safe zones!
                        <ul>
                            <li>
                            Your room
                            </li>
                            <li>
                            Classrooms <i>(<b>ONLY</b> when class is in session)</i>
                            </li>
                            <li>
                            Club meetings
                            </li>
                        </ul>
                    </li>
                    <li>
                        You <b>CANNOT</b> be eliminated <i>while</i> eliminating someone else
                    </li>
                    <li>
                        Dominate the leaderboards, meet new people, and HAVE FUN!!
                    </li>
                </ol>
                </div>
            </div>
        </div>
        <br />
      </div>
    );
  }
}

export default About;
