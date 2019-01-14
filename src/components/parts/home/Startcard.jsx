import React, { Component } from "react";

export default class Startcard extends Component {
  componentDidMount() {}

  clickHandler(e) {
    this.props.openDialog();
  }

  render() {
    return (
      <div className="pcard mdc-card">
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text lang" id="welcomeTextHeader">
            {this.props.languageTranslation.welcomeTextHeader}
          </h2>
        </div>
        <div className="mdl-card__supporting-text lang" id="welcomeText">
          {this.props.languageTranslation.welcomeText}
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <a
            className="mdl-button mdl-button--colored
                                    mdl-js-button mdl-js-ripple-effect"
            id="create-project-btn"
            onClick={this.clickHandler.bind(this)}
          >
            <div className="lang" id="start-project-btn">
              {this.props.languageTranslation.start_project_btn}
            </div>
          </a>
        </div>
      </div>
    );
  }
}
