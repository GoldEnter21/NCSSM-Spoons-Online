import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/signin";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRoles] = useState("");

  const REGISTER_URL = "/register-user";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // fetch(`http://localhost:8082/api/users${REGISTER_URL}`, {
      //   method: "POST",
      //   headers: { "content-Type": "application/json" },
      //   body: JSON.stringify({
      //     role: role,
      //     name: name,
      //     email: email,
      //     password: password,
      //   }),
      // });
      axios
      .post(`http://localhost:8082/api/users${REGISTER_URL}`, 
      {
        role: role,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        playerEliminations: null,
        playerStatus: "alive",
        playerTarget: '',
      });


      //once successfully registered the user is navigated to the sign-in page
      navigate(from, { replace: true });
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } 
    catch (err) {
      if (!err?.response) {
        console.log("no server response");
      } else if (err?.response?.status === 409) {
        console.log("user already exists");
      } else {
        console.log("registration failed");
      }
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="form-control">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            autoComplete="off"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            autoComplete="off"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="off"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="roles">Roles</label>
          <div className="custom-select">
            <select onChange={(e) => setRoles(e.target.value)}>
              <option value="">Choose a Role</option>
              <option value="Pl">Player</option>
              <option value="Ad">Admin</option>
            </select>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="text"
            autoComplete="off"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            required
          />
        </div>

        {/* Making sure every field in the form is filled out before letting the user Submit */}
        <input 
          type='submit'
          className='btn btn-outline-warning btn-block mt-4'
        />

        <p>
          Already registered <Link to="/Signin">Sign In</Link>{" "}
        </p>
        <span></span>
      </form>
    </div>
  );
};

export default Signup;
