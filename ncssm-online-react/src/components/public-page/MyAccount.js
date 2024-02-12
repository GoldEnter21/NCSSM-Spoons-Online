import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import "../../styles/myaccount.css";
import axios from "axios";
import TimeComponentSet from "./settabletimer";
import TimeComponent from "./timer";


const MyAccount = () => {
    const [success = true, setSuccess] = useState();
    const [ver = false, setVerified] = useState();
    const [firstName, setfirstName] = useState();
    const [alias, setAlias] = useState();
    const [email, setEmail] = useState();
    const [deathState, setDeath] = useState();
    const [aliasnew, setAliasNew] = useState();
    const [lastName, setlastName] = useState();
    const [useAlias, setAliasUse] = useState();
    const [use, setAliasUseNew] = useState();
    const [codeVal = "", setCode] = useState();
    const [error, setError]= useState("");
    const [placement, setPlacement] = useState();
    const navigate = useNavigate();
  
    useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
      if (!loggedInUser) {
        setSuccess(false)
      }
      axios.get(`https://express-backend.fly.dev/api/users/${loggedInUser}`)
      .then((res) => {
        if (res.data.password === localStorage.getItem("pass")) {
            setSuccess(true)
            setfirstName(res.data.firstName)
            setlastName(res.data.lastName)
            setEmail(res.data.email)
            setAliasUse(res.data.useAlias)
            setPlacement(res.data.placement)
            if (res.data.playerStatus !== "alive") {
              var x = new Date(res.data.deadOn)
              var y = new Date()
              y.setHours(23,59,59,999);
              var z = new Date()
              if (x.toDateString() === y.toDateString()) {
                setDeath(Math.abs(z.getTime() - y.getTime())/1000)
              } else {
                setDeath("timeout")
              }
            } else {
              setDeath("alive")
            }
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
      await axios.put(`https://express-backend.fly.dev/api/users/${localStorage.getItem("user")}`, {useAlias: use})
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
        {deathState === "alive" ? <></> : deathState === "timeout" ? <p className="editmy">You are dead, and your window for logging eliminations has passed. Thanks for playing!</p> : 
        <p className="editmy"> You are currently dead! However, you can still log eliminations for <span style={{color: "#d8ffb1"}}><TimeComponentSet startSeconds={deathState}></TimeComponentSet></span> (Hours:Minutes:Seconds)</p>}
        {deathState !== "timeout" ?
        <button className="btn btn-danger btn-block text-center pt-4">
          <a className="editmy" style={{color:"black"}}><p>Log An Elimination</p></a>
        </button> : <p className="editmy" style={{color:"white"}}>You placed <u>#{placement}</u></p>}
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
          {alias === "No Alias Set!" ? 
          <><p>Alias: <span style={{color: "#ff7f7f"}}>{alias}</span></p>
          <div className="editmy">
          <label>➡️ Edit Alias:  `</label>
          <input
            type="text"
            className="inputClassmy"
            maxLength="30"
            onChange={(e) => setAliasNew(e.target.value)}
          />
        </div>
          </> 
          : <label htmlFor="alias">Alias: <span style={{fontStyle: "italic", color: "#fddc5c"}}>{alias}</span></label>}
        </div>
        
        <div style={{paddingTop: "2rem"}} className="editmy">
        {alias === "No Alias Set!" ? 
        <><p>NOTE: You will not be able to edit your alias once it is set!</p>
        <p style={{fontStyle:"italic"}}>But you will still be able to choose whether to use it!</p> 
        <div className="editmy">
        <button className="btn btn-outline-warning btn-block mt-4" >
          Update Alias
        </button>
        </div></>:
        useAlias === "true" ?
        <><p>You are currently <span style={{color: "#d8ffb1"}}>using</span> your alias! (Your real name will be hidden on leaderboards)</p>
         <div className="editmy">
        <button onClick={() => setAliasUseNew("false")}className="btn btn-outline-warning btn-block mt-4" >
          Toggle Use Alias
        </button>
        </div></> :
        <><p>You are currently <span style={{color: "#ff7f7f"}}>NOT</span> using your alias! (Your real name will be used on leaderboards)</p>
         <div className="editmy">
        <button onClick={() => setAliasUseNew("true")}className="btn btn-outline-warning btn-block mt-4" >
          Toggle Use Alias
        </button>
        </div></>}
        </div>
        <div className="editmy" style={{marginTop:"2rem"}}>
          {alias == "No Alias Set!" ? 
          <><p><span style={{color: "#ff7f7f"}}>Since your alias is not set, your <u>real name</u> will be used on leaderboards.</span></p> 
          <p><span style={{color: "#fddc5c"}}>Set an alias to maintain anonymity and prevent yourself from being found!</span></p> 
          <p><span style={{fontStyle: "italic"}}>Offensive or NSFW Aliases will be deleted by admin!</span></p> </>: 
          <></>}
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