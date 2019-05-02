import $ from "jquery";
import Fade from "@material-ui/core/Fade";
import LinearProgress from "@material-ui/core/LinearProgress";
import Navbar from "../parts/home/navbar";
import NormalText from "../parts/editing/normal-text";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import Selector from "../parts/editing/selector";
import settings from "../settings/settings";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import BottomNav from "../parts/editing/BottomNav";
import { register } from "../../serviceWorker";
import FloatButton from "../parts/audio/FloatButton";
import MusicSelector from "../parts/audio/MusicSelector";
import language from "../settings/language";

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
      msg: "",
      openMusicSelector: false,
      songID: null,
      playingSongName: ""
    };
    this.numOfTranslation = 0;
    this.uploadTranslation = [];
  }

  componentDidMount() {
    let params = this.props.match.params;
    console.log(this.props.match.params)
    let userID = params.userID;
    let sid = params.id;
    this.setState({
      songInfo: {
        artist: params.artist,
        title: params.title,
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

  componentWillMount() {}

  getTranslated(lines) {
    let returnlst = [];
    let i = 0;
    for (let line of lines) {
      if (line["line_translation"] !== "") {
        returnlst.push({
          index: i,
          content: line["line_translation"]
        });
        i += 1;
      }
    }
    return returnlst;
  }

  addNewLine(position) {
    let lines = this.state.lines;
    let firstpart = lines.slice(0, position + 1);
    let secondpart = lines.slice(position + 1, lines.length - 1);
    firstpart.push({ line_content: "", line_translation: null });
    let result = firstpart.concat(secondpart);
    console.log(this.state.songInfo);
    $.post(
      settings.getURL("add/new/line"),
      {
        position: position,
        userID: this.state.userID,
        sid: this.state.songInfo.sid
      },
      data => {
        if (data.status) {
          this.setState({ lines: result });
        }
      }
    );
  }

  changeLine(position, content) {
    $.post(
      settings.getURL("update/line"),
      {
        position: position,
        userID: this.state.userID,
        sid: this.state.songInfo.sid,
        data: content
      },
      data => {
        if (data.status) {
          console.log("Updated changes ");
        }
      }
    );
  }

  removeLine(position) {
    $.post(
      settings.getURL("delete/line"),
      {
        position: position,
        userID: this.state.userID,
        sid: this.state.songInfo.sid
      },
      data => {
        if (data.status) {
        }
      }
    );
  }

  createNormalText() {
    return this.state.lines.map((line, index) => {
      return (
        <NormalText
          addNewLine={this.addNewLine.bind(this)}
          removeLine={this.removeLine.bind(this)}
          change={this.changeLine.bind(this)}
          key={index}
          line_content={line["line_content"]}
          line_translation={
            line["line_translation"] === null ? "" : line.line_translation
          }
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
    if (this.numOfTranslation > 0) {
      this.setState({ isloaded: false });
      this.setState({ msg: "Saving...", isloaded: true });
      $.post(
        settings.getURL("update/translation"),
        {
          userID: this.state.userID,
          sid: this.state.songInfo.sid,
          data: JSON.stringify(this.uploadTranslation)
        },
        data => {
          this.setState({ msg: "All changes has been saved", isloaded: true });
          console.log("Updated");
        }
      ).fail(() => {
        this.setState({ msg: "Error uploading translation" });
      });
      this.numOfTranslation = 0;
      this.uploadTranslation = [];
    }
  }

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
    let file = new Blob(["\ufeff", txt], { type: "text/plain;charset=utf-8" });
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
          link="/"
        />
        <Navbar
          title={this.state.songInfo.artist + "---" + this.state.msg}
          color="default"
        />
        <div className="container-fluid h-100">
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
                    text: language.words
                  },
                  {
                    mode: "sentences",
                    text: language.sentences
                  }
                ]}
                title={language.type_selector}
              />
            </div>
            <div className="col-2 mr-0">
              <IconButton
                onClick={e => {
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
          <div style={{ marginBottom: window.innerHeight * 0.12 }}>
            {this.createText()}
          </div>
          <FloatButton
            openMusicSelector={() => {
              this.setState({ openMusicSelector: true });
            }}
          />
        </div>
        <MusicSelector
          onClick={(id, name) => {
            this.setState({
              songID: id,
              openMusicSelector: false,
              playingSongName: name
            });
          }}
          openDialog={this.state.openMusicSelector}
          close={() => {
            this.setState({ openMusicSelector: false });
          }}
          musicInstance={this.props.musicInstance}
        />
        <BottomNav
          musicInstance={this.props.musicInstance}
          songID={this.state.songID}
          songName={this.state.playingSongName}
        />
      </div>
    );
  }
}
export default withRouter(EditingPage);
