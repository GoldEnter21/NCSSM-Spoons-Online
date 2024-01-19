import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import "../../styles/myaccount.css";
import axios from "axios";


const MyAccount = () => {
    const [success = true, setSuccess] = useState();
    const [firstName, setfirstName] = useState();
    const [lastName, setlastName] = useState();
  
    useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
      if (!loggedInUser) {
        setSuccess(false)
      }
      axios.get(`http://localhost:3000/api/users/${loggedInUser}`)
      .then((res) => {
        if (res.data.password === localStorage.getItem("pass")) {
            console.log("success")
            setSuccess(true)
            setfirstName(res.data.firstName)
            setlastName(res.data.lastName)
        } else {
            setSuccess(false)
        }
      })
    }, []);

    return(
    <div className="MyAccount">
        {success ?  
        <div className="container">
            <div className="comingab">
                <p> If your name is <span style={{color: "white"}}>{firstName} {lastName}</span>, you're good to go! </p>
                <p>`</p>
                <p><i>More profile details and options coming soon :)</i></p>
            </div>
        </div> :
        <div className="comingab">
          <p> There was an issue with your login. If you see this page, contact me </p>
        </div>
        }
    </div>
    )
}

export default MyAccount;