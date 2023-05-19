import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

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

  var userInfo = [],
    role = "";
  
  // finding the uesr information, getting their role, then loading the corresponding page depending on their role
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8082/api/users")
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
            }
          }
        });

        setAuth({ role: `${role}`, name: `${firstName}` });
      })
      .then(() => {
        if (role === "Pl") {
          navigate(`../show-user/${user_id}`, { replace: true });
        } else if (role === "Ad") {
          navigate("../admin-only", { replace: true });
        }
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
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
        <button disabled={!firstName && !lastName && !password ? true : false}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signin;
