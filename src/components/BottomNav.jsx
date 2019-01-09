import React, { Component } from "react";
import { TextField, Paper, Button } from "@material-ui/core";
import $ from "jquery";
import settings from "./settings/settings";

export default class BottomNav extends Component {

  constructor(){
    super()
    this.state = {
      translation : ""
    }
  }
  render() {
    return (
      <div>
        <Paper
          className="fixed-bottom"
          elevation={10}
          style={{ height: "100px" }}
        >
          <div className="row">
            <TextField
              className="ml-auto mr-auto mt-3"
              label={"Translation"}
              variant="outlined"
              onBlur={e => {
                if (e.target.value !== "") {
                  $.post(
                    settings.getURL("get/translation/word"),
                    {
                      word: e.target.value
                    },
                    data => {
                      this.setState({translation: data.translation})
                    }
                  );
                }
              }}
            />
          </div>
          
          <div className="row"><span className="row ml-auto mr-auto">Translation: {this.state.translation}</span></div>
        </Paper>
      </div>
    );
  }
}
