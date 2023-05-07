import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import CreateUser from './components/admin-page/CreateUser';
import ShowUserList from './components/admin-page/ShowUserList';
import ShowUserDetails from './components/ShowUserDetails';
import UpdateUserInfo from './components/admin-page/UpdateUserInfo';
import Signup from './components/sign-up/Signup';
import Signin from './components/sign-up/Signin';
import Auth from './components/Auth';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<ShowUserList />} />
          <Route path='/register-user' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/create-user' element={<CreateUser />} />
          <Route path='/edit-user/:id' element={<UpdateUserInfo />} />
          <Route path='/show-user/:id' element={<ShowUserDetails />} />
          <Route element={<Auth allowedRoles={["Ad"]} />} >
            <Route path="/admin-only" element={<ShowUserList />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;