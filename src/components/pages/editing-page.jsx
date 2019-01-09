import $ from "jquery";
import Fade from "@material-ui/core/Fade";
import LinearProgress from "@material-ui/core/LinearProgress";
import Navbar from "../parts/navbar";
import NormalText from "../parts/normal-text";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import Selector from "../parts/selector";
import settings from "../settings/settings";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import {
  TextField,
  IconButton,
  Menu,
  MenuItem,
  BottomNavigation,
  BottomNavigationAction,
  Paper
} from "@material-ui/core";
import BottomNav from "../BottomNav";

class EditingPage extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      userID: null,
      lines: [],
      songInfo: {},
      autoSuggest: [],
      translated: [],
      isloaded: false,
      mode: "normal_text",
      msg: ""
    };
    this.numOfTranslation = 0;
    this.uploadTranslation = [];
  }

  componentDidMount() {
    let { state } = this.props.location;
    let userID = state.userID;
    let sid = state.sid;
    this.setState({
      songInfo: {
        artist: state.artist,
        title: state.title,
        sid: sid
      },
      userID: userID
    });

    $.post(settings.getURL("get/lyrics"), {
      userID: userID,
      sid: sid
    }).done(data => {
      this.setState({
        lines: data["lines"],
        isloaded: true,
        translated: this.getTranslated(data["lines"])
      });
    });
  }

  getTranslated(lines) {
    let returnlst = [];
    let i = 0;
    for (let line of lines) {
      if (line["line-translation"] !== "") {
        returnlst.push({
          index: i,
          content: line["line_translation"]
        });
        i += 1;
      }
    }
    return returnlst;
  }

  createNormalText() {
    return this.state.lines.map((line, index) => {
      return (
        <NormalText
          key={index}
          line_content={line["line_content"]}
          line_translation={line["line_translation"]}
          change={this.changeHandler.bind(this)}
          translatedLine={this.state.translated}
          index={index}
          update={this.updateHandler.bind(this)}
        />
      );
    });
  }

  //update the translation
  //also push the translation to server
  updateHandler(index, value) {
    let lines = this.state.lines;
    let translated = this.state.translated;
    let i = -1;
    for (let t of translated) {
      if (t.index === index) {
        i = index;
      }
    }
    if (i != -1) {
      translated[i].content = value;
    } else {
      translated.push({ index: translated.length, content: value });
    }

    lines[index]["line_translation"] = value;
    this.numOfTranslation += 1;
    this.uploadTranslation.push({ line_at: index, translation: value });

    this.setState({
      translated: translated,
      lines: lines
    });
    // Do the uploading
    if (this.numOfTranslation > 1) {
      this.setState({ isloaded: false });
      $.post(
        settings.getURL("update/translation"),
        {
          userID: this.state.userID,
          sid: this.state.songInfo.sid,
          data: JSON.stringify(this.uploadTranslation)
        },
        data => {
          this.setState({ msg: "Uploaded transaltion", isloaded: true });
          console.log("Updated");
        }
      ).fail(() => {
        this.setState({ msg: "Error uploading translation" });
      });
      this.numOfTranslation = 0;
      this.uploadTranslation = [];
    }
  }

  changeHandler(value) {}

  createText() {
    switch (this.state.mode) {
      case "normal_text":
        return this.createNormalText();
        break;
    }
  }

  createDownloadFileOrignal() {
    let txt = "";
    for (let line of this.state.lines) {
      txt += line.line_content + "\n";
    }
    return txt;
  }

  createDownloadFileTranslation() {
    let txt = "";
    for (let line of this.state.lines) {
      if (line.line_translation !== null && line.line_translation !== "") {
        txt += line.line_translation + "\n";
      }
    }
    return txt;
  }

  createDownloadFileTranslationWithOriginal() {
    let txt = "";
    for (let line of this.state.lines) {
      txt += line.line_content + "\n";
      if (line.line_translation !== null && line.line_translation !== "") {
        txt += line.line_translation + "\n\n";
      }
    }
    return txt;
  }

  download(txt) {
    let element = document.createElement("a");
    let file = new Blob([txt], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${this.state.songInfo.title}-translation.txt`;
    element.click();
    this.setState({ anchorEl: null });
  }

  render() {
    return (
      <div>
        <Navbar
          icon="arrowBack"
          title={this.state.songInfo.title}
          color="secondary"
          link="/api_translator/home"
        />
        <Navbar
          title={this.state.songInfo.artist + "---" + this.state.msg}
          color="default"
        />
        <div className="container-fluid">
          <Fade in={!this.state.isloaded} timeout={1000}>
            <LinearProgress color="secondary" />
          </Fade>
          <div className="row">
            <div className="col-10">
              <Selector
                className="selector"
                selections={[
                  {
                    mode: "words",
                    text: this.props.languageTranslation.words
                  },
                  {
                    mode: "sentences",
                    text: this.props.languageTranslation.sentences
                  }
                ]}
                title={this.props.languageTranslation.type_selector}
              />
            </div>
            <div className="col-2 mr-0">
              <IconButton
                onClick={e => {
                  // let txt = this.createDownloadFileTranslationWithOriginal()
                  // let element = document.createElement('a')
                  // let file = new Blob([txt],{type: 'text/plain'})
                  // element.href = URL.createObjectURL(file)
                  // element.download = `${this.state.songInfo.title}-translation.txt`
                  // element.click()
                  this.setState({ anchorEl: e.currentTarget });
                }}
              >
                <CloudDownloadIcon />
              </IconButton>
              <Menu
                id="download-menu"
                anchorEl={this.state.anchorEl}
                open={this.state.anchorEl !== null}
                onClose={() => {
                  this.setState({ anchorEl: null });
                }}
              >
                <MenuItem
                  onClick={() => {
                    let txt = this.createDownloadFileOrignal();
                    this.download(txt);
                  }}
                >
                  Download Orignal Text
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    let txt = this.createDownloadFileTranslation();
                    this.download(txt);
                  }}
                >
                  Download Translation
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    let txt = this.createDownloadFileTranslationWithOriginal();
                    this.download(txt);
                  }}
                >
                  Download Translation With Original
                </MenuItem>
              </Menu>
            </div>
          </div>
          {this.createText()}
          <BottomNav />
        </div>
      </div>
    );
  }
}
export default withRouter(EditingPage);
