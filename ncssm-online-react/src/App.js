import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import CreateUser from './components/admin-page/CreateUser';
import ShowUserList from './components/admin-page/ShowUserList';
import ShowUserDetails from './components/ShowUserDetails';
import UpdateUserInfo from './components/admin-page/UpdateUserInfo';
import Signup from './components/sign-up/Signup';
import Signin from './components/sign-up/Signin';
import Auth from './components/Auth';
import ShowAssassinGraph from './components/public-page/ShowAssassinGraph';
import ShowHomePage from './components/public-page/ShowHomePage';
import UpdatePlayersElimination from './components/public-page/UpdateDeath';
import ShowMap from './components/public-page/ShowMapPage';
import ShowMap2 from './components/public-page/ShowMap2Page';
import Navbar from './components/navbar/navbar';
import Leaderboards from './components/public-page/Leaderboards';
import About from './components/public-page/About';
import MyAccount from './components/public-page/MyAccount';
import Credits from './components/public-page/Credits';
import Leaderboards2 from './components/public-page/Leaderboards2';
import LeaderboardsS from './components/public-page/LeaderboardsS';
import Leaderboards3 from './components/public-page/Leaderboards3';
import EliminationBuffer from './components/public-page/EliminationBuffer';
import RegistrationClosed from './components/sign-up/closed';

/**
 * @author Anwar, Sheerabdhi, Tejas 
 * @returns the website
 */
const App = () => {
  return (
    <Router>
        <div className="App">
        <div className="bg">
          <Navbar />
        </div>
        </div>
      <div>
        <Routes>
          <Route exact path='/' element={<ShowHomePage />} />
          <Route path='/register-user' element={<RegistrationClosed />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/map2' element={<ShowMap2 />} />
          <Route path='/leaderboardsplayers' element={<Leaderboards2 />} />
          <Route path='/leaderboardsdays' element={<Leaderboards3 />} />
          <Route path='/leaderboards' element={<LeaderboardsS />} />
          <Route path='/about' element={<About />} />
          <Route path='/myaccount' element={<MyAccount />} />
          <Route path='/credits' element={<Credits />} />
          <Route path='/update-elimination' element={<EliminationBuffer/>} />
          <Route element={<Auth allowedRoles={["Ad"]} />} >
            <Route path='/edit-user/:id' element={<UpdateUserInfo />} />
            <Route path='/show-user/:id' element={<ShowUserDetails />} />
            <Route path='/create-user' element={<CreateUser />} />
            <Route path="/admin-onlylol" element={<ShowUserList />} />
            <Route path="/assassin-graph" element={<ShowAssassinGraph />} />
            <Route path='/map' element={<ShowMap />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;

// import "./App.css";
// import { useState } from "react";
// import Papa from "papaparse";
// import axios from "axios";

// function App() {
//   // State to store parsed data
//   const [parsedData, setParsedData] = useState([]);

//   //State to store table Column name
//   const [tableRows, setTableRows] = useState([]);

//   //State to store the values
//   const [values, setValues] = useState([]);

//   const changeHandler = (event) => {
//     const valuesArray = [];
//     // Passing file data (event.target.files[0]) to parse using Papa.parse
//     Papa.parse(event.target.files[0], {
//       header: false,
//       skipEmptyLines: true,
//       complete: function (results) {
//         const rowsArray = [];

//         // Iterating data to get column name and their values
//         results.data.map((d) => {
//           rowsArray.push(Object.keys(d));
//           valuesArray.push(Object.values(d));
//         });

//         // Parsed Data Response in array format
//         setParsedData(results.data);

//         // Filtered Column Names
//         setTableRows(rowsArray[0]);

//         // Filtered Values
//         setValues(valuesArray);
//       },
//     });
//   };

//   const handle = async (e) => {
//     e.preventDefault();
//     for (var i = 0; i < values.length; i++) {
//       await axios.get(`https://express-backend.fly.dev/api/users/${values[i]}`)
//       .then((res) => {
//         axios.put(`https://express-backend.fly.dev/api/users/${values[i]}`, {playerTarget: values[i+1][0]})
//         axios.put(`https://express-backend.fly.dev/api/users/${values[i]}`, {prospectiveTarget: values[i+1][0]})
//         console.log(res.data.firstName + " " + res.data.lastName)
//       }) 
//     }
//   }
  

//   return (
//     <div>
//       {/* File Uploader */}
//       <input
//         type="file"
//         name="file"
//         onChange={changeHandler}
//         accept=".csv"
//         style={{ display: "block", margin: "10px auto" }}
//       />
//       <input
//         type="file"
//         name="file"
//         onChange={handle}
//         accept=".csv"
//         style={{ display: "block", margin: "10px auto" }}
//       />
//       <br />
//       <br />
//       {/* Table */}
//       <table>
//         <thead>
//           <tr>
//             {tableRows.map((rows, index) => {
//               return <th key={index}>{rows}</th>;
//             })}
//           </tr>
//         </thead>
//         <tbody>
//           {values.map((value, index) => {
//             return (
//               <tr key={index}>
//                 {value.map((val, i) => {
//                   return <td key={i}>{val}</td>;
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default App;