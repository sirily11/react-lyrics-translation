import React, { Component } from "react";
import { TextField, Button, MobileStepper,Fade } from "@material-ui/core";
import $ from "jquery";
import settings from "../../settings/settings";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import "rc-slider/assets/index.css";
import Player from "../audio/Player";

export default class BottomNav extends Component {
  constructor() {
    super();
    this.state = {
      translation: "",
      pageIndex: 0,
      playingTime: 0
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.songID !== null) {
        this.setState({ pageIndex: 1 });
      }
    }
  }

  renderTranslation() {
    return (
      <div className="ml-auto mr-auto">
        <TextField
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
                  this.setState({ translation: data.translation });
                }
              );
            }
          }}
        />
        <div>Translation: {this.state.translation}</div>
      </div>
    );
  }

  renderStepper() {
    return (
      <MobileStepper
        steps={2}
        position="static"
        activeStep={this.state.pageIndex}
        nextButton={
          <Button
            size="small"
            onClick={() => {
              this.setState({ pageIndex: 1 });
            }}
          >
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={() => {
              this.setState({ pageIndex: 0 });
            }}
          >
            <KeyboardArrowLeft />
          </Button>
        }
      />
    );
  }

  render() {
    let height = window.innerHeight * 0.15;
    return (
      <div
        className="fixed-bottom"
        style={{ backgroundColor: "#eeeeee", height: height }}
      >
        {this.renderStepper()}
        <Fade in={this.state.pageIndex === 0} unmountOnExit>
          <div className="row" style={{ height: "100%" }}>
            {this.renderTranslation()}
          </div>
        </Fade>
          <div style={{ height: "100%", width: "100%" }}>
            <Player
              musicInstance={this.props.musicInstance}
              songID={this.props.songID}
              songName={this.props.songName}
            />
          </div>
      </div>
    );
  }
}
