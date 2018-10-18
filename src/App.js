import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import EditingPage from "./components/editing-page";
import Home from "./components/homePage";
import languageTranslation from "./components/settings/language";
import React, { Component } from "react";
import "material-design-lite/material.min.css";
import "material-design-lite/material.min.js";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    let languageCode = navigator.language.substr(0, 2);
    //e225f036-bef7-11e8-a97b-b0c090c3b9ec
    //sirily11
    this.state = {
      title: "",
      translation: languageTranslation[languageCode],
      userID: "",
      userName: "",
      loginStatus: false
    };
  }

  componentWillMount() {
    let response = sessionStorage.getItem("userData");
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
      <BrowserRouter>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  {...props}
                  languageTranslation={this.state.translation}
                  userID={this.state.userID}
                  userName={this.state.userName}
                  loginStatus={this.state.loginStatus}
                  login={this.handleLogin.bind(this)}
                  logout={this.handleLogout.bind(this)}
                />
              )}
            />
            <Route
              path="/editing"
              render={props => (
                <EditingPage
                  {...props}
                  languageTranslation={this.state.translation}
                />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
