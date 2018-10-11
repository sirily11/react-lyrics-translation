import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import EditingPage from "./components/editing-page";
import Home from "./components/homePage";
import languageTranslation from "./components/language";
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
      userID: "e225f036-bef7-11e8-a97b-b0c090c3b9ec"
    };
  }

  titleChangeHandler(title) {
    console.log(title);
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
