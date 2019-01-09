import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import settings from "../settings/settings";
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

  handleClose(from){
    this.setState({ anchorEl: null });
    switch (from) {
      case "delete":
        $.post(
          settings.getURL("delete/project"),
          {
            userID: this.props.userID,
            sid: this.props.sid
          },
          data => {
            if(data.status === true){
              this.props.remove(this.props.sid);
            }
          }
        );

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
          <div
            className="mdl-card__title mdl-card--expand projectCard"
            style={{ background: `url(${this.props.image})  center / cover` }}
          >
            <h2 className="mdl-card__title-text project-title">
              {artist + "-" + title }
            </h2>
          </div>
          <div className="mdl-card__actions mdl-card--border row">
            <div className="col-10">
              <Link
                to={{
                  pathname: "/api_translator/editing",
                  state: {
                    userID: this.props.userID,
                    artist: artist,
                    title: title,
                    sid : this.props.sid
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
                onClose={this.handleClose.bind(this,"close")}
              >
                <MenuItem id="delete" onClick={this.handleClose.bind(this,"delete")}>
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
