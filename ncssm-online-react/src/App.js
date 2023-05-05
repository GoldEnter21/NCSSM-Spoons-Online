import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import CreateUser from './components/CreateUser';
import ShowUserList from './components/ShowUserList';
import ShowUserDetails from './components/ShowUserDetails';
import UpdateUserInfo from './components/UpdateUserInfo';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<ShowUserList />} />
          <Route path='/create-user' element={<CreateUser />} />
          <Route path='/edit-user/:id' element={<UpdateUserInfo />} />
          <Route path='/show-user/:id' element={<ShowUserDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;