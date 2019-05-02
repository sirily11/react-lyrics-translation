import React, { Component } from "react";
import {
  MuiThemeProvider,
  createMuiTheme,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@material-ui/core";
import purple from "@material-ui/core/colors/purple";
import $ from "jquery";
import Navbar from "../parts/home/navbar";
import settings from "../settings/settings";
import ReactMarkdown from "react-markdown"

const theme = createMuiTheme({
  palette: {
    primary: purple
  }
});

export default class Document extends Component {
  constructor() {
    super();
    this.state = {
      releases: [
        {
          tag_name: undefined,
          name: undefined,
          body: undefined
        }
      ]
    };
  }

  componentDidMount() {
    $.getJSON(
      "https://api.github.com/repos/sirily11/react-lyrics-translation/releases",
      data => {
        this.setState({ releases: data });
      }
    );
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Navbar icon="arrowBack" title={"Document"} color="primary" link="/" />
        <div className="container">
          {this.state.releases.map((release, i) => {
            return (
              <div>
                <h4>{release.name}</h4>
                <span>Version: {release.tag_name}</span>
                <ReactMarkdown source={release.body}></ReactMarkdown>
                <Divider></Divider>
              </div>
            );
          })}
        </div>
      </MuiThemeProvider>
    );
  }
}
