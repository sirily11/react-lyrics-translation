import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import NormalText from "./nomal-text";
import $ from "jquery";
import Selector from "./selector";
import Navbar from "./navbar";

class EditingPage extends Component {
  constructor() {
    super();
    this.state = {
      songInfo: {},
      lines: []
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
      `https://api.mytranshelper.com/api/load-project/${userID}/${
        state.title
      }/${state.artist}`
    ).done(data => {
      console.log(data["lines"][0]);
      this.setState({ lines: data["lines"] });
    });
  }

  createNormalText() {
    return this.state.lines.map((line, index) => {
      return (
        <NormalText
          key={index}
          line_content={line["line-content"]}
          line_translation={line["line-translation"]}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <Navbar
          icon="arrowBack"
          title={this.state.songInfo.title}
          color="secondary"
        />
        <Navbar title={this.state.songInfo.artist} color="default" />
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
