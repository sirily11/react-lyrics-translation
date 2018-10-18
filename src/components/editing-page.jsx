import $ from "jquery";
import Fade from "@material-ui/core/Fade";
import LinearProgress from "@material-ui/core/LinearProgress";
import Navbar from "./navbar";
import NormalText from "./normal-text";
import { withRouter } from "react-router-dom";
import React, { Component } from "react";
import Selector from "./selector";
import settings from "./settings/settings";

class EditingPage extends Component {
  constructor() {
    super();
    this.state = {
      lines: [],
      songInfo: {},
      autoSuggest: [],
      translated: [],
      isloaded: false,
      mode: "normal_text"
    };
  }

  componentDidMount() {
    let { state } = this.props.location;
    this.setState({
      songInfo: {
        artist: state.artist,
        title: state.title
      }
    });

    let userID = state.userID;
    $.getJSON(settings.getURL("get/projects/lyrics"), {
      userID: userID,
      artist: state.artist,
      title: state.title
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
          content: line["line-translation"]
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
          line_content={line["line-content"]}
          line_translation={line["line-translation"]}
          change={this.changeHandler.bind(this)}
          translatedLine={this.state.translated}
          index={index}
          update={this.updateHandler.bind(this)}
        />
      );
    });
  }

  updateHandler(index, value) {
    let lines = this.state.lines;
    let translated = this.state.translated;
    let i = -1;
    if (value === "") return;
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
    lines[index]["line-translation"] = value;
    // console.log(translated);
    this.setState({
      translated: translated,
      lines: lines
    });
  }

  changeHandler(value) {}

  createText() {
    switch (this.state.mode) {
      case "normal_text":
        return this.createNormalText();
        break;
    }
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
        <Navbar title={this.state.songInfo.artist} color="default" />
        <div className="container-fluid">
          <Fade in={!this.state.isloaded} timeout={1000}>
            <LinearProgress color="secondary" />
          </Fade>
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
          {this.createText()}
        </div>
      </div>
    );
  }
}
export default withRouter(EditingPage);
