import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext, AuthProvider } from "../../context/auth-provider";
import useAuth from "../../hooks/useAuth";
import axios from 'axios';

const Signin = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  var user_id = "";
  //state for information from the form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
    
    // const [userInfo, setUserInfo] = useState([]);
    var userInfo=[], role="";
    const handleSubmit = async (e) => {
        e.preventDefault();
        axios
        .get('http://localhost:8082/api/users')
        .then((res) => {
            userInfo = res.data;
            role = res.role;
        })
        .then((res) => {
            // console.log(firstName + ":" + lastName + ":" + password);
            userInfo.forEach((user) => {
                if ((user.firstName === firstName) && (user.lastName === lastName)) {
                    if (user.password === password) {
                        user_id = user._id;
                        role = user.role;
                    }
                }
            });

            //storing employee information in our Auth state
            setAuth({ role: `${role}`, name: `${firstName}`});
        })
        .then(() => {
            // console.log("D: " + role);
            if (role === "Pl") {
                navigate(`../show-user/${user_id}`, { replace: true });
            }
            else if (role === "Ad") {
                navigate("../admin-only", { replace: true });
            }
        })
    }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {/* <p>{error}</p> */}
        <h1>Sign In</h1>
        <div>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button disabled={!firstName && !lastName && !password ? true : false}>Submit</button>
      </form>
    </div>
  );
};

export default Signin;
