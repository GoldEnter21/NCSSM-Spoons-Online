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
          <Route path='/register-user' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/map2' element={<ShowMap2 />} />
          <Route path='/leaderboards' element={<Leaderboards />} />
          <Route path='/about' element={<About />} />
          <Route path='/myaccount' element={<MyAccount />} />
          <Route path='/credits' element={<Credits />} />
          <Route element={<Auth allowedRoles={["Ad"]} />} >
            <Route path='/edit-user/:id' element={<UpdateUserInfo />} />
            <Route path='/show-user/:id' element={<ShowUserDetails />} />
            <Route path='/create-user' element={<CreateUser />} />
            <Route path="/admin-only" element={<ShowUserList />} />
            <Route path="/assassin-graph" element={<ShowAssassinGraph />} />
            <Route path='/map' element={<ShowMap />} />
            <Route path='/update-elimination' element={<UpdatePlayersElimination />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;