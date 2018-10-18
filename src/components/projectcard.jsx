import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import settings from "./settings/settings";
import $ from "jquery";

export default class ProjectCard extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null
    };
  }

  handleOpen(e) {
    this.setState({
      anchorEl: e.currentTarget
    });
  }

  handleClose = e => {
    this.setState({ anchorEl: null });
    let id = e.target.id;
    switch (id) {
      case "delete":
        $.ajax({
          url: settings.getURL("delete/project"),
          type: "delete",
          contentType: "application/json; charset=utf-8",
          crossDomain: true,
          dataType: "json",
          data: JSON.stringify({
            userID: this.props.userID,
            artist: this.props.artist,
            title: this.props.title
          }),
          complete: data => {
            this.props.remove(this.props.artist, this.props.title);
            console.log(data);
          }
        });
        break;
    }
  };

  delete() {}

  render() {
    let title = this.props.title;
    let artist = this.props.artist;
    const { anchorEl } = this.state;
    return (
      <div className="col-sm-6 col-md-4 col-lg-4">
        <div className=" project-card mdc-card pcard">
          <div className="mdl-card__title mdl-card--expand projectCard">
            <h2 className="mdl-card__title-text project-title">
              {artist + "-" + title}
            </h2>
          </div>
          <div className="mdl-card__actions mdl-card--border row">
            <div className="col-10">
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
            <div className="col-2">
              <IconButton
                onClick={this.handleOpen.bind(this)}
                aria-haspopup="true"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={this.handleClose}
              >
                <MenuItem id="delete" onClick={this.handleClose.bind(this)}>
                  Delete
                </MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
