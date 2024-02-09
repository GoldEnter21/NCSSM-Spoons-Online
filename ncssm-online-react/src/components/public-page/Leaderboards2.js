import React, { useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/showusers.css";
import LeaderboardCard from "./LeaderboardCard";

/**
 * Used to show all of the users on the admin-page
 * @returns all of the users and some information about them
 */
const Leaderboards2 = ()  => {
  const [users, setUsers] = useState([]);

  // Get all of the users
  useEffect(() => {
    axios
      .get("https://express-backend.fly.dev/api/users")
      .then((res) => {
        setUsers(res.data);

      })
      .catch((err) => {
        console.log("Error from ShowUserList");
      });
  }, []);

  // TODO: Change this so it only adds alive users here, add a new page for dead players
  // Makes all of the users into UserCard objects
  const userList =
    users.length === 0
      ? "Loading Users. . ."
      : users.map((user, k) => <LeaderboardCard user={user} key={k} /> );
  
  

  function SortTable(n) {
    // useEffect(() => {
      var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      table = document.getElementById("customers")
      switching = true;
      //Set the sorting direction to ascending:
      dir = "asc"; 
      /*Make a loop that will continue until
      no switching has been done:*/
      while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
          //start by saying there should be no switching:
          shouldSwitch = false;
          /*Get the two elements you want to compare,
          one from current row and one from the next:*/
          x = rows[i].getElementsByTagName("TD")[n];
          y = rows[i + 1].getElementsByTagName("TD")[n];
          /*check if the two rows should switch place,
          based on the direction, asc or desc:*/
          if (dir === "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch= true;
              break;
            }
          } else if (dir === "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /*If a switch has been marked, make the switch
          and mark that a switch has been done:*/
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          //Each time a switch is done, increase this count by 1:
          switchcount ++;      
        } else {
          /*If no switching has been done AND the direction is "asc",
          set the direction to "desc" and run the while loop again.*/
          if (switchcount === 0 && dir === "asc") {
            dir = "desc";
            switching = true;
          }
        }
    }
    var headers = document.getElementsByTagName("TH");
    if (dir === "asc" && n === 0){
      headers[0].innerHTML = "Name or Alias 🡅"
      headers[1].innerHTML = "# of Elims 🡆"
      headers[2].innerHTML = "Status 🡆"
      headers[3].innerHTML = "Survival Time 🡆"
    }
    if (dir === "desc" && n === 0){
      headers[0].innerHTML = "Name or Alias 🡇"
      headers[1].innerHTML = "# of Elims 🡆"
      headers[2].innerHTML = "Status 🡆"
      headers[3].innerHTML = "Survival Time 🡆"
    }
    if (dir === "asc" && n === 1){
      headers[0].innerHTML = "Name or Alias 🡆"
      headers[1].innerHTML = "# of Elims 🡅"
      headers[2].innerHTML = "Status 🡆"
      headers[3].innerHTML = "Survival Time 🡆"
    }
    if (dir === "desc" && n === 1){
      headers[0].innerHTML = "Name or Alias 🡆"
      headers[1].innerHTML = "# of Elims 🡇"
      headers[2].innerHTML = "Status 🡆"
      headers[3].innerHTML = "Survival Time 🡆"
    }
    if (dir === "asc" && n === 2){
      headers[0].innerHTML = "Name or Alias 🡆"
      headers[1].innerHTML = "# of Elims 🡆"
      headers[2].innerHTML = "Status 🡅"
      headers[3].innerHTML = "Survival Time 🡆"
    }
    if (dir === "desc" && n === 2){
      headers[0].innerHTML = "Name or Alias 🡆"
      headers[1].innerHTML = "# of Elims 🡆"
      headers[2].innerHTML = "Status 🡇"
      headers[3].innerHTML = "Survival Time 🡆"
    }
    if (dir === "asc" && n === 3){
      headers[0].innerHTML = "Name or Alias 🡆"
      headers[1].innerHTML = "# of Elims 🡆"
      headers[2].innerHTML = "Status 🡆"
      headers[3].innerHTML = "Survival Time 🡅"
    }
    if (dir === "desc" && n === 3){
      headers[0].innerHTML = "Name or Alias 🡆"
      headers[1].innerHTML = "# of Elims 🡆"
      headers[2].innerHTML = "Status 🡆"
      headers[3].innerHTML = "Survival Time 🡇"
    }
  }

  return (
    <div className="Leaderboards2">
      <div className="container">
        <div className="row">
          <div style={{width: "10%"}} className="col"></div>
          <div style={{width: "40%"}} className="col">
            <p className="titlel2" ><u>Players</u></p>
          </div>
          <div style={{width: "40%"}} className="col">
            <p className="titlel2" ><a href="/leaderboardsdays">Days</a></p>
          </div>
          <div style={{width: "10%"}} className="col"></div>
        </div>
        <p className="titlel23" style={{paddingTop:"0.1rem"}}> Click the table headers to sort by that leaderboard category! </p>
        <p className="titlel23" style={{paddingTop:"0.1rem", fontStyle:"normal"}}> If you have an alias set, it will show up in <span style={{color:"#fddc5c", fontStyle:"italic"}}>Gold Italics</span> </p>
        <div>
          <table id="customers">
            <tr>
              <th onClick={() => SortTable(0)}>Name or Alias 🡆</th>
              <th onClick={() => SortTable(1)}># of Elims 🡆</th>
              <th onClick={() => SortTable(2)}>Status 🡆</th>
              <th onClick={() => SortTable(3)}>Survival Time 🡆</th>
            </tr>
              {userList}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboards2;