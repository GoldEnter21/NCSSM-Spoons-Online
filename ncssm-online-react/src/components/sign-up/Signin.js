import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import "../../styles/signin.css";

/**
 * Makes the form to sign in
 * @returns the form for signing in 
 */
const Signin = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  var user_id = "";
  //state for information from the form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  var userInfo = [],
    role = "";
  
  // finding the uesr information, getting their role, then loading the corresponding page depending on their role
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .get("http://https://express-backend.fly.dev//api/users")
      .then((res) => {
        userInfo = res.data;
        role = res.role;
      })
      .then((res) => {
        userInfo.forEach((user) => {
          if (user.firstName === firstName && user.lastName === lastName) {
            if (user.password === password) {
              user_id = user._id;
              role = user.role;
              localStorage.setItem('user', user_id)
              localStorage.setItem('pass', password)
            }
          }
        });

        setAuth({ role: `${role}`, name: `${firstName}` });
      })
      .then(() => {
        if (role === "Pl") {
          navigate(`../myaccount`, { replace: true });
          window.location.reload()
        } else if (role === "Ad") {
          navigate("../admin-only", { replace: true });
          window.location.reload()
        }
      });
  };

  return (
    <div className="Signin">
      <form onSubmit={handleSubmit} className="ml-4 mr-4">
        <div className="titlesi">
        { //Check if message failed
        (user)
          ? <p> Alr </p> 
          : <p> SIGN IN </p> 
        }
        </div>
        <div className="questioni">
          <label htmlFor="firstname">First Name  `</label>
          <input
            type="text"
            id="firstname"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="questioni">
          <label htmlFor="lastName">Last Name  `</label>
          <input
            type="text"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="questioni">
          <label htmlFor="password">Password  `</label>
          <input
            type="text"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-outline-warning btn-block mt-4 mb-4" disabled={!firstName || !lastName || !password ? true : false}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signin;
