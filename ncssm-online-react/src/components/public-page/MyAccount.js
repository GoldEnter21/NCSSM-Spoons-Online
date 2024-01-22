import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import "../../styles/myaccount.css";
import axios from "axios";


const MyAccount = () => {
    const [success = true, setSuccess] = useState();
    const [ver = false, setVerified] = useState();
    const [firstName, setfirstName] = useState();
    const [lastName, setlastName] = useState();
    const [codeVal = "", setCode] = useState();
    const [error, setError]= useState("");
  
    useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
      if (!loggedInUser) {
        setSuccess(false)
      }
      axios.get(`https://express-backend.fly.dev/api/users/${loggedInUser}`)
      .then((res) => {
        if (res.data.password === localStorage.getItem("pass")) {
            console.log("success")
            setSuccess(true)
            setfirstName(res.data.firstName)
            setlastName(res.data.lastName)
        } else {
            setSuccess(false)
        }
        if (res.data.verified === "true"){
          setVerified(true)
        } else {
          setVerified(false)
        }
      })
    }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      await axios.get(`https://express-backend.fly.dev/api/users/${localStorage.getItem("user")}`)
      .then((res) => {
        if(res.data.verified === codeVal){
          axios.put(`https://express-backend.fly.dev/api/users/${localStorage.getItem("user")}`, {verified: "true"})
          setVerified(true)
        } else {
          setError("Invalid verification code! Are you sure you're an NCSSM student?")
        }
      })
    }

    return(
    <div className="MyAccount">
        {success ? ver ?
        <div className="container">
            <div className="comingab">
                <p> If your name is <span style={{color: "white"}}>{firstName} {lastName}</span>, you're good to go! </p>
                <p>`</p>
                <p><i>More profile details and options coming soon :)</i></p>
            </div>
        </div> :         
        <div className="container">
            <div className="comingab">
                <p style={{color: "#ff7f7f"}}> Your account needs verification! </p>
                <p>`</p>
                <p><i>Check your NCSSM email for a verification code, and paste it below:</i></p>
                <form onSubmit={handleSubmit} className="ml-4 mr-4">
                <div className="question">
                  <label htmlFor="code">Code: `</label>
                  <input
                    id="code"
                    type="text"
                    autoComplete="off"
                    maxLength="30"
                    className="inputClass"
                    onChange={(e) => {
                      setCode(e.target.value);
                    }}
                    value={codeVal}
                  />
                </div>
                <input
                  type='submit'
                  className='btn btn-outline-warning btn-block mt-4 mb-4'
                />
                <div className="errorma">
                  {error?<label>{error}</label>:null}
                </div>
                </form>
            </div>
        </div> :
        <div className="comingab">
          <p> There was an issue with your login. If you see this page, contact me (Joy Niranjan) on Facebook </p>
        </div>
        }
    </div>
    )
}

export default MyAccount;