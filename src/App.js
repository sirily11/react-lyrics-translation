import { HashRouter, Route, Link, Switch } from "react-router-dom";
import EditingPage from "./components/pages/editing-page";
import Home from "./components/pages/homePage";
import languageTranslation from "./components/settings/language";
import React, { Component } from "react";
import $ from 'jquery'
import settings from "./components/settings/settings";
import "material-design-lite/material.min.css";
import "material-design-lite/material.min.js";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      userID: "",
      userName: "",
      loginStatus: false,
      musicInstance : null
    };
  }

  componentWillMount() {
    let response = sessionStorage.getItem("userData");
    this.setState({musicInstance: this.props.musicInstance})
    if (response !== null) {
      let userData = JSON.parse(response);
      this.setState({
        userID: userData.userID,
        userName: userData.userName,
        loginStatus: true
      });
    }
  }

  titleChangeHandler(title) {
    console.log(title);
  }

  handleLogout() {
    this.setState({
      loginStatus: false,
      userName: "",
      userID: ""
    });
    sessionStorage.removeItem("userData");
  }

  handleLogin(userID, userName) {
    console.log(userID);
    this.setState({
      loginStatus: true,
      userID: userID,
      userName: userName
    });
    let userData = {
      userID: userID,
      userName: userName
    };
    sessionStorage.setItem("userData", JSON.stringify(userData));
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  {...props}
                  userID={this.state.userID}
                  userName={this.state.userName}
                  loginStatus={this.state.loginStatus}
                  login={this.handleLogin.bind(this)}
                  logout={this.handleLogout.bind(this)}
                />
              )}
            />
            <Route
              path="/editing/:userID/:artist/:title/:id"
              render={props => (
                <EditingPage
                  {...props}
                  musicInstance={this.state.musicInstance}
                />
              )}
            />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
