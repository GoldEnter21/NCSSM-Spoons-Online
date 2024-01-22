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
  // const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState();
  
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   if (loggedInUser) {
  //     setUser(loggedInUser);
  //   }
  // }, []);

  var userInfo = [],
    role = "";
  
  // finding the uesr information, getting their role, then loading the corresponding page depending on their role
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .get("https://express-backend.fly.dev/api/users")
      .then((res) => {
        userInfo = res.data;
        role = res.role;
      })
      .then((res) => {
        userInfo.forEach((user) => {
          if (user.email === email) {
            if (user.password === password) {
              user_id = user._id;
              role = user.role;
              localStorage.setItem('user', user_id)
              localStorage.setItem('pass', password)
              setFirstName(user.firstName)
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
          <p> SIGN IN </p> 
        </div>
        <div className="questioni">
          <label htmlFor="email">NCSSM Email  `</label>
          <input
            type="text"
            id="email"
            className="inputClassi"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="questioni">
          <label htmlFor="password">Password  `</label>
          <input
            type="text"
            id="password"
            className="inputClassi"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="questioni">
        <button className="btn btn-outline-warning btn-block mt-4 mb-4" disabled={!email || !password ? true : false}>
          Submit
        </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
