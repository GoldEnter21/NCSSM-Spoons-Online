import React, { useState, useEffect } from 'react';
import logo from '../../logo.svg';
import './navbar.css';

const Navbar = () => {
  const [user, setUser] = useState();
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img src={logo} />
        </div>
        <div className="gpt3__navbar-links_container">
          <p><a href="/">Home</a></p>
          <p><a href="/map2">Campus_Map</a></p>
          <p><a href="/leaderboards">Leaderboards</a></p>
          <p><a href="/about">What_Is_Spoons?</a></p>
          <p><a href="/credits">Credits_And_Acknowledgments</a></p>
        </div>
      </div>
      {user && <div className="gpt3__navbar-sign">
        <p><a href="/" onClick={() => {
            localStorage.clear();
          }}>Sign out</a></p>
        <button type="button"><a href="/myaccount">👤 My Account</a></button>
      </div>} 
      {!user && <div className="gpt3__navbar-sign">
        <p><a href="/signin">Sign in</a></p>
        <button type="button"><a href="/register-user">Sign Up</a></button>
      </div>
      }

      {/* <div className="gpt3__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(false)} />}
        {toggleMenu && (
        <div className="gpt3__navbar-menu_container scale-up-center">
          <div className="gpt3__navbar-menu_container-links">
          <p><a href="/">Home</a></p>
          <p><a href="/map2">Campus_Map</a></p>
          <p><a href="/leaderboards">Leaderboards</a></p>
          <p><a href="/about">What_Is_Spoons?</a></p>
          </div>
          <div className="gpt3__navbar-menu_container-links-sign">
            <p><a href="/signin">Sign in</a></p>
            <button type="button"><a href="/register-user">Sign Up</a></button>
          </div>
        </div>
        )}
      </div> */}
    </div>
  );
};

export default Navbar;