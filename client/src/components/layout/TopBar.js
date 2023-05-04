import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  let newPostLink
  if (user) {
    newPostLink = (
      <li className="menu-text">
        <Link to="/salads/new">Post a salad!</Link>
      </li>
    )
  }

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li>
            <img src="https://cdn-icons-png.flaticon.com/512/3768/3768493.png" />
          </li>
          <li>
            <h1>Salad Theory</h1>
          </li>
          <li className="menu-text">
            <Link to="/salads">Salads</Link>
          </li>
            {newPostLink}
          <li className="menu-text">
            <Link to="/home">Home</Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
