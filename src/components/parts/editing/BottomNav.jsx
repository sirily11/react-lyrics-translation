import React, { Component } from "react";
import {
  TextField,
  Button,
  MobileStepper,
  Fade,
  Paper
} from "@material-ui/core";
import $ from "jquery";
import settings from "../../settings/settings";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import "rc-slider/assets/index.css";
import Player from "../audio/Player";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time

export default class BottomNav extends Component {
  constructor() {
    super();
    this.state = {
      translation: "",
      pageIndex: 0,
      playingTime: 0,
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
      <div className="ml-auto mr-auto mt-3 mb-3">
        <TextField
          id="translation"
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
                  this.setState({
                    translation: data.translation
                  });
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
    let height = window.innerHeight * 0.1;
    return (
      <div>
        x
        <Draggable
          handle="#title-bar"
        >
          <Paper
            className="fixed-bottom col-md-5 col-sm-10  m-md-4 mx-sm-auto mb-1 mr-auto"
            elevation={20}
            style={{ height: height, borderRadius: "10px" }}
          >
            <div className="h-100 w-100">
            
              <Player
                musicInstance={this.props.musicInstance}
                songID={this.props.songID}
                songName={this.props.songName}
              />
            </div>
          </Paper>
        </Draggable>
        <Fade in={true}>
        <Draggable cancel="#translation">
          <Paper
            elevation={20}
            className="row  col-md-5 col-5  m-md-4 mx-sm-auto mb-1 mr-auto"
            style={{
              height: height,
              zIndex: 300,
              borderRadius: "10px",
              bottom: 100,
              position: "fixed"
            }}
          >
            {this.renderTranslation()}
          </Paper>
        </Draggable>
        </Fade>
      </div>
    );
  }
}
