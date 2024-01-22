import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../../styles/signup.css";

/**
 * 
 * @returns the form to signup from homepage
 */
const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/signin";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRoles] = useState("");
  const [hall, setHall] = useState("");
  const [adkey, setAdkey] = useState("");
  const [error, setError]= useState("");
  // const [dupeUser, setDupe] = useState("");
  

  const REGISTER_URL = "/register-user";

  /**
   * Adding the data into the database
   * @param {*} e 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (firstName === "" || email === "" || lastName === "" || password === "" || role === "" || passwordconfirm === "" || hall === "") {
        throw new Error("Missing Fields!")
      }
      if (role === "Ad") {
        axios
        .get(`https://express-backend.fly.dev/api/adkey/`)
        .then((res) => {
          if (res.data[0].adkey !== adkey){
            throw new Error("Incorrect Admin Passkey!")
          }
        }).catch((err) =>{
          console.log("admin lockout")
          setError('Incorrect Admin Passkey!')
        })
      }
      if (role === "Pl" && adkey !== "") {
        throw new Error("Adkey not blank!")
      }
      else if (!email.includes("@ncssm.edu")) {
        throw new Error("Not of NCSSM origin")
      }
      else if (password !== passwordconfirm) {
        throw new Error("Passwords do not match!")
      } else {
        axios
        .get(`https://express-backend.fly.dev/api/users`)
        .then((res) =>{
          for (let i = 0; i< res.data.length; i++){
            if (res.data[i].email === email) {
              throw new Error("User Already Exists!")
            }
          }
          var code = Math.floor(100000 + Math.random() * 900000);
          axios
          .post(`https://express-backend.fly.dev/api/users${REGISTER_URL}`, 
          {
            role: role,
            firstName: firstName,
            lastName: lastName,
            email: email,
            hall: hall,
            password: password,
            playerEliminations: 0,
            playerStatus: "alive",
            playerTarget: '',
            alias: '',
            verified: String(code)
          });

          axios.post(`https://express-backend.fly.dev/info/${email}`,
          {
            code: code
          })
    
          // once successfully registered the user is navigated to the sign-in page
          navigate(from, { replace: true });
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");

        }).catch((err) =>{
          console.log("user exists")
          setError('That user already exists! If you believe this is a mistake, contact me (Joy Niranjan) on Facebook!')
        })
          
      }

    } 
    catch (err) {
      if (err.message === "Missing Fields!"){
        console.log("missing fields")
        setError('There are some missing fields. Make sure to fill everything out to complete the registration process!')
      }
      else if (err.message === "Adkey not blank!"){
        console.log("player adkey error")
        setError('Please leave the administator passkey blank if you are registering as a normal player!')
      }
      else if (err.message === "Not of NCSSM origin") {
        console.log("not an ssm email")
        setError('Please use your NCSSM email address!')
      }
      else if (err.message === "Passwords do not match!") {
        console.log("pasword error")
        setError('Passwords do not match!')
      }
      else if (!err?.response) {
        console.log("no server response");
        setError("Oops! The server isn't responding right now. This is an error on our end. Check back later!")
      } else if (err?.response?.status === 409) {
        console.log("user already exists");
        setError('That user already exists! If this is you, sign in instead.')
      } else {
        console.log("registration failed");
        setError('Something went wrong. . .')
      }
    }
  };

  return (
    <div className="Signup">
      <form onSubmit={handleSubmit} className="ml-4 mr-4">
        <div className="titles">
          <p>REGISTER</p>
        </div>
        <div className="question">
          <label htmlFor="firstName">First Name  `</label>
          <input
            id="firstName"
            type="text"
            autoComplete="off"
            maxLength="30"
            className="inputClass"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
          />
        </div>
        <div className="question">
          <label htmlFor="lastName">Last Name  `</label>
          <input
            id="lastName"
            type="text"
            autoComplete="off"
            maxLength="30"
            className="inputClass"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
          />
        </div>
        <div className="question">
          <label htmlFor="email">NCSSM Email  `</label>
          <input
            id="email"
            type="email"
            autoComplete="off"
            maxLength="30"
            className="inputClass"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>
        <div className="question">
          <label htmlFor="roles">Role  `</label>
          <select className="inputClass" onChange={(e) => setRoles(e.target.value)}>
            <option value="">Choose a Role</option>
            <option value="Pl">Player</option>
            <option value="Ad">Admin</option>
          </select>
        </div>

        <div className="question">
          <label htmlFor="hall">Hall  `</label>
          <select className="inputClass" onChange={(e) => setHall(e.target.value)}>
            <option value="">Choose a Hall</option>
            <option value="1bl">1st Beall</option>
            <option value="2bl">2nd Beall</option>
            <option value="3bl">3rd Beall</option>
            <option value="2br">2nd Bryan</option>
            <option value="3br">3rd Bryan</option>
            <option value="4br">4th Bryan</option>
            <option value="1c2c1d">1C2C1D</option>
            <option value="1e2e2d">1E2E2D</option>
            <option value="greynolds">Greynolds</option>
            <option value="royall">Royall(1&2)</option>
            <option value="Hunt 1">1st Hunt</option>
            <option value="Hunt 2w">2nd West</option>
            <option value="Hunt 2e">2nd East</option>
            <option value="Hunt 3w">3rd West</option>
            <option value="Hunt 3e">3rd East</option>
            <option value="Hunt 4w">4th West</option>
            <option value="Hunt 4e">4th East</option>
            <option value="Hill 1">1st Hill</option>
            <option value="Hill 2">2nd Hill</option>
          </select>
        </div>

        <div className="question">
          <label htmlFor="password">Password  `</label>
          <input
            id="password"
            type="text"
            autoComplete="off"
            maxLength="30"
            className="inputClass"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>

        <div className="question">
          <label htmlFor="passwordconfirm">Confirm Password  `</label>
          <input
            id="passwordconfirm"
            type="text"
            autoComplete="off"
            maxLength="30"
            className="inputClass"
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
            value={passwordconfirm}
          />
        </div>

        <div className="question" style={{marginTop: "2rem"}}>
          <p>(Leave the following blank if not registering as an admin): </p>
        </div>
        <div className="question">
          <label htmlFor="password">Admin Passkey  `</label>
          <input
            id="adkey"
            type="text"
            autoComplete="off"
            maxLength="30"
            className="inputClass"
            onChange={(e) => {
              setAdkey(e.target.value);
            }}
            value={adkey}
          />
        </div>

        {/* Making sure every field in the form is filled out before letting the user Submit */}
        <div className="question">
        <input
          type='submit'
          className='btn btn-outline-warning btn-block mt-4 mb-4'
        />
        </div>
        <div className="question">
          <p>
            Already registered? <u><Link to="/Signin">Sign In</Link>{" "}</u>
          </p>
        </div>
        <div className="error">
          {error?<label>{error}</label>:null}
        </div>
            
      </form>
    </div>
  );
};

export default Signup;
