import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import SaladListComponent from "./SaladListComponent";
import SaladShow from "./SaladShow";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute"
import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import HomePage from "./HomePage";
import NewSaladForm from "./NewSaladForm"
import UserProfilePage from "./UserProfilePage"

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <AuthenticatedRoute exact path="/salads/new" component={NewSaladForm} user={currentUser}/>
        <Route exact path="/salads" component={SaladListComponent}/>
        <Route exact path="/salads/:id" component={SaladShow} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/profile" component={UserProfilePage} />
      </Switch>
    </Router>
  );
};

export default hot(App);
