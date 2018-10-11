import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ProjectCard extends Component {
  constructor() {
    super();
  }
  render() {
    let title = decodeURI(this.props.title);
    let artist = decodeURI(this.props.artist);
    return (
      <div className="col-sm-6 col-md-4 col-lg-3">
        <div className=" project-card mdc-card pcard">
          <div className="mdl-card__title mdl-card--expand projectCard">
            <h2 className="mdl-card__title-text project-title">
              {artist + "-" + title}
            </h2>
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <Link
              to={{
                pathname: "/editing",
                state: {
                  userID: this.props.userID,
                  artist: artist,
                  title: title
                }
              }}
              className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
            >
              {this.props.loadBtn}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
