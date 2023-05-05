import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

const Signup = () => {
//regex to make sure the employee's name is above 3 letters
  const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;

//to check if the employees password meets certain criterias
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/signin";
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);

  //state to store our password 
  const [password, setPassword] = useState("");
//state to store the outcome of our regex test
  const [validPass, setValidPass] = useState(false);

//state to store the employee's email
  const [email, setEmail] = useState("");
//state to store the employee's roles
  const [roles, setRoles] = useState("");

  let match;

  const REGISTER_URL = '/register-user';
  useEffect(() => {
//check if the users name is valid
    setValidName(USER_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    // check if the password is valid
    setValidPass(PWD_REGEX.test(password));
  }, [password, matchPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validName && validPass) {
      try {
        fetch(`http://localhost:3000${REGISTER_URL}`, {
          method: "POST",
          headers: {"content-Type": "application/json"},
          body: JSON.stringify({
            role: role,
            name: name,
            email: email,
            password: password,
          }),
        });

//once successfully registered the user is navigated to the sign-in page
        navigate(from, { replace: true });
        setName("");
        setEmail("");
        setPassword("");
      } catch (err) {
        if (!err?.response) {
          console.log("no server response");
        } else if (err?.response?.status === 409) {
          console.log("employee already exist");
        } else {
          console.log("registration failed");
        }
      }
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        //code for registration form
      </form>
    </div>
  );
};

export default Signup;