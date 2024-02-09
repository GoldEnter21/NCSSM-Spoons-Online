import React, { useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";
import "../../styles/showusers.css";

/**
 * Used to show all of the users on the admin-page
 * @returns all of the users and some information about them
 */
const ShowUserList = ()  => {
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
      ? "Loading Users..."
      : users.map((user, k) => <UserCard user={user} key={k} /> );
  
  

  function SortTable(n) {
    // useEffect(() => {
      var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      table = document.getElementById("customers")
      console.log("table: " + table)
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
  // // }, [])
  // return(
  //   <>{rows}</>
  // )
  }

  return (
    <div className="ShowUserList">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="display-4 text-center">Users List</h2>
          </div>

          <div className="col-md-11">
            <Link
              to="/"
              className="btn btn-outline-warning float-left"
            >
              Homepage
            </Link>

            <Link
              to="/create-user"
              className="btn btn-outline-warning float-right"
            >
              + Add New User
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>

        <div className="col-md-11">
          <Link
            to="/assassin-graph"
            className="btn btn-outline-warning float-left"
          >
            + Look To Assassin Graph
          </Link>
          <br />
          <br />
          <hr />
        </div>

        <div>
          <table id="customers">
            <tr>
              <th onClick={() => SortTable(0)}>Name</th>
              <th onClick={() => SortTable(1)}>Hall</th>
              <th onClick={() => SortTable(2)}>Email</th>
              <th onClick={() => SortTable(3)}>Role</th>
              <th onClick={() => SortTable(4)}># of Elims</th>
              <th onClick={() => SortTable(5)}>Status</th>
              <th onClick={() => SortTable(6)}>Alias</th>
              <th onClick={() => SortTable(7)}>Target</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
              {userList}
          </table>
        </div>
      </div>
    </div>
  );
}

export default ShowUserList;

// import React from "react";
// // import { useState, useEffect } from 'react';
// import BinarySearchTree from "../../javascript-functions/BinarySearchTree";
// import { Link } from "react-router-dom";
// import { ChangeUserTarget } from "../../javascript-functions/database-access.mjs";
// import "../../styles/showusers.css";

// /**
//  * Used in the BST for comparisons based on eliminations
//  * @param {PlayerObject} player1
//  * @param {PlayerObject} player2
//  * @returns
//  */
// function compareEliminations(player1, player2) {
//   return player1.playerEliminations - player2.playerEliminations;
// }

// // The initialized BST that will be used
// var elims = new BinarySearchTree(compareEliminations);

// /**
//  * Is the main HomePage and shows related information
//  * @param {userList, locationList} props
//  */
// class ShowUserList extends React.Component {
//   // Default Constructor
//   constructor(props) {
//     super(props);
//     console.log(this.props.userList.length)
//   }

//   render() {
//     // Making sure it doesn't last forever/infinitely
//     if (this.props.userList.length >= 0) {
//       // Inserting all of the users into the bst
//       for (let i = 0; i < this.props.userList.length; i++) {
//         elims.insert(this.props.userList[i]);
//       }
//     }
//     return (
//       <div className="ShowUserList">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-12">
//             <br />
//             <h2 className="display-4 text-center">Users List</h2>
//           </div>

//           <div className="col-md-11">
//             <Link
//               to="/"
//               className="btn btn-outline-warning float-left"
//             >
//               Homepage
//             </Link>

//             <Link
//               to="/create-user"
//               className="btn btn-outline-warning float-right"
//             >
//               + Add New User
//             </Link>
//             <br />
//             <br />
//             <hr />
//           </div>
//         </div>

//         <div className="col-md-11">
//           <Link
//             to="/assassin-graph"
//             className="btn btn-outline-warning float-left"
//           >
//             + Look To Assassin Graph
//           </Link>
//           <br />
//           <br />
//           <hr />
//         </div>

//         <div>
//           <table id="customers">
//           <thead>
//             <tr>
//               <th onClick={this.sortTable(0)}>Name</th>
//               <th>Hall</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th># of Elims</th>
//               <th>Status</th>
//               <th>Alias</th>
//               <th>Target</th>
//               <th>Edit</th>
//               <th>Delete</th>
//             </tr> : 
//           </thead>
//           <tbody>
//           {this.props.userList.length === 0 ? 
//         <>cowboy shit</> : <>{this.props.userList}</>
//             }
//           </tbody>
//           </table>
//         </div>
//       </div>
//       <script>
//       </script>
//     </div>
//     );
//   }
//   componentDidMount(){
//     window.addEventListener('storage', this.checkStorage)
// }

// componentWillUnmount(){
//     window.removeEventListener('storage', this.checkStorage)
// }
// }


// export default ShowUserList;