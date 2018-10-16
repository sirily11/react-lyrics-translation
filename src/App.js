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
    this.state = {
      title: "",
      translation: languageTranslation[languageCode],
      userID: "e225f036-bef7-11e8-a97b-b0c090c3b9ec",
      userName: "",
      loginStatus: false
    };
  }

  titleChangeHandler(title) {
    console.log(title);
  }

  handleLogout() {
    this.setState({
      loginStatus: false,
      userName: ""
    });
  }

  handleLogin(userID, userName) {
    console.log(userID);
    this.setState({
      loginStatus: true,
      userName: userName
    });
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
