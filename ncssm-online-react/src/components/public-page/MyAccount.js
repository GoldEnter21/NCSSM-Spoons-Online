import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import "../../styles/myaccount.css";
import axios from "axios";


const MyAccount = () => {
    const [success = true, setSuccess] = useState();
    const [ver = false, setVerified] = useState();
    const [firstName, setfirstName] = useState();
    const [alias, setAlias] = useState();
    const [email, setEmail] = useState();
    const [aliasnew, setAliasNew] = useState();
    const [lastName, setlastName] = useState();
    const [codeVal = "", setCode] = useState();
    const [error, setError]= useState("");
    const navigate = useNavigate();
  
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
            setEmail(res.data.email)
            if (res.data.alias === "") {
              setAlias("No Alias Set!")
            } else {setAlias(res.data.alias)}
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

    const handleVerSubmit = async (e) => {
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

    const handleSubmit = async (e) => {
      e.preventDefault();
      await axios.put(`https://express-backend.fly.dev/api/users/${localStorage.getItem("user")}`, {alias: aliasnew})
      window.location.reload();
    }

    const resetSubmit = async (e) => {
      e.preventDefault();
      await axios.put(`https://express-backend.fly.dev/api/users/${localStorage.getItem("user")}`, {alias: ""})
      window.location.reload();
    }

    const logSubmit = async (e) => {
      e.preventDefault();
      navigate("../update-elimination", { replace: true });
    }

    // C2F29C
    // <span style={{color: "white"}}>{firstName} {lastName}</span>
    return(
    <div className="MyAccount">
        {success ? ver ?
        <>
        <form onSubmit={logSubmit} className="pl-4 pr-4 pt-4 " >
        <button className="btn btn-danger btn-block text-center pt-4">
          <a className="editmy" style={{color:"black"}}><p>Log An Elimination</p></a>
        </button>
        </form>
        <form onSubmit={handleSubmit} className="ml-4 mr-4">
        
        <div className="titlemy">
          <p> PROFILE DETAILS </p> 
        </div>
        <div className="editmy">
          <p>Name: <span style={{color: "white"}}>{firstName} {lastName}</span> </p>
        </div>
        <div className="editmy">
          <p>Email: <span style={{color: "white"}}>{email}</span> </p>
        </div>
        <div className="editmy">
          {alias == "No Alias Set!" ? 
          <p>Alias: <span style={{color: "#ff7f7f"}}>{alias}</span></p> 
          : <label htmlFor="alias">Alias: <span style={{fontStyle: "italic", color: "#fddc5c"}}>{alias}</span></label>}
        </div>
        <div className="editmy">
          <label>➡️ Edit Alias:  `</label>
          <input
            type="text"
            className="inputClassmy"
            maxLength="30"
            onChange={(e) => setAliasNew(e.target.value)}
          />
        </div>
        <div className="editmy">
        <button className="btn btn-outline-warning btn-block mt-4" >
          Update Profile Details
        </button>
        </div>
        <div className="editmy">
        <button onClick={function(e) {setAliasNew("")}}className="btn btn-outline-danger btn-block mt-4 mb-4" >
          Reset Profile Details
        </button>
        </div>
        <div className="editmy">
          {alias == "No Alias Set!" ? 
          <><p><span style={{color: "#ff7f7f"}}>Since your alias is not set, your <u>real name</u> will be used on leaderboards.</span></p> 
          <p><span style={{color: "#fddc5c"}}>Set an alias to maintain anonymity and prevent yourself from being found!</span></p> 
          <p><span style={{fontStyle: "italic"}}>Offensive or NSFW Aliases will be deleted by admin!</span></p> </>: 
          <>
          <p>Note: You will not be able to edit your alias once registration closes!</p>
          <p>(But you will still be able to choose whether to use it)</p>
          </>}
        </div>
        {/* <div className="titlemy">
          <p> LOG AN ELIMINATION: </p> 
        </div> */}
        </form>
        </>:         
        <div className="container">
            <div className="comingab">
                <p style={{color: "#ff7f7f"}}> Your account needs verification! </p>
                <p>`</p>
                <p><i>Check your NCSSM email for a verification code, and paste it below:</i></p>
                <form onSubmit={handleVerSubmit} className="ml-4 mr-4">
                <div className="question">
                  <label htmlFor="code">Code: `</label>
                  <input
                    id="code"
                    type="text"
                    autoComplete="off"
                    maxLength="30"
                    className="inputClassmy"
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