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
      songInfo: {},
      lines: [],
      autoSuggest: [],
      isloaded: false
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
    $.getJSON(
      `${settings.baseURL}/${userID}/${state.title}/${state.artist}`
    ).done(data => {
      this.setState({
        lines: data["lines"],
        isloaded: true
      });
    });
  }

  autoSuggestions() {
    let returnlst = [];
    let i = 0;
    for (let line of this.state.lines) {
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
    let suggestions = this.autoSuggestions();
    console.log("A");
    return this.state.lines.map((line, index) => {
      return (
        <NormalText
          key={index}
          line_content={line["line-content"]}
          line_translation={line["line-translation"]}
          autoSuggestions={suggestions}
          index={index}
          update={this.updateHandler.bind(this)}
        />
      );
    });
  }

  updateHandler(data) {
    let oldSuggestion = this.state.autoSuggest;
    for (let i = 0; i < oldSuggestion.length; i++) {
      if (oldSuggestion[i].index === data.index) {
        oldSuggestion[i].content = data.content;
      } else {
        oldSuggestion.push(data);
      }
    }
    console.log(this.state.autoSuggest);
    // this.setState({
    //   autoSuggest: oldSuggestion
    // });
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
        {this.createNormalText()}
      </div>
    );
  }
}
export default withRouter(EditingPage);
