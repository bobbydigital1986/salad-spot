import React, { useState } from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  let newPostLink;
  if (user) {
    newPostLink = (
      <li className="menu-text">
        <Link to="/salads/new">Post a salad!</Link>
      </li>
    );
  }

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li>
            <img src="https://cdn-icons-png.flaticon.com/512/3768/3768493.png" />
          </li>
          <li className="menu-text">
            <h1>Salad Theory</h1>
          </li>
          
        </ul>
      </div>
      <div className="top-bar-right">
        {user ? (
          <ul className="dropdown menu">
            <li className="menu-text">
              <Link to="/home">Home</Link>
            </li>
              {newPostLink}
            <li className="menu-text">
              <Link to="/salads">Salads</Link>
            </li>
            <li>
              <div className="menu-text">
                <button
                  onClick={toggleDropDown}
                  className="username user-greeting"
                >
                  Hello {user?.username}!
                </button>
                {showDropDown && (
                  <ul className="dropdown-menu">
                    <li className="menu-text">
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                      <a key="sign-out"> <SignOutButton /></a>
                    </li>
                  </ul>
                )}
              </div>
            </li>
          </ul>
        ) : (
          <ul className="menu">
            <li className="menu-text">
              <Link to="/home">Home</Link>
            </li>
              {newPostLink}
            <li className="menu-text">
              <Link to="/salads">Salads</Link>
            </li>
            <li className="menu-text">
              <Link to="/user-sessions/new">Sign In</Link>
            </li>
            <li className="menu-text">
              <Link to="/users/new">
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default TopBar;