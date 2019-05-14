import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowRightIcon from "@material-ui/icons/ArrowRightAlt";
import IconButton from "@material-ui/core/IconButton";
import settings from "../../settings/settings";
import $ from "jquery";
import EditableHeader from "./EditableHeader";
import { Card, CardMedia, CardContent, CardActions } from "@material-ui/core";

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

  handleClose(from) {
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
            if (data.status === true) {
              this.props.remove(this.props.sid);
            }
          }
        );

        break;
    }
  }

  delete() { }

  render() {
    let title = this.props.title;
    let artist = this.props.artist;
    const { anchorEl } = this.state;
    return (
      <div className="col-6 col-md-4 col-lg-4 p-2">
        <Card  >
          <CardMedia image={this.props.image} style={{ height: "200px" }}>
          </CardMedia>
          <CardContent className="row" style={{ height: "70px" }}>
            <div className="my-auto ml-3">
              <h5 className="my-auto">
                <Link
                  to={`/editing/${this.props.userID}/${artist}/${title}/${this.props.sid}`}
                >{artist} - {title}
                </Link>
              </h5>
            </div>
          </CardContent>
          <div style={{ position: "absolute", zIndex: "1000", bottom: 80, right: 10 }}>
            <IconButton
              onClick={this.handleOpen.bind(this)}
              aria-haspopup="true"
              style={{backgroundColor: "white"}}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={this.handleClose.bind(this, "close")}
            >
              <MenuItem
                id="delete"
                onClick={this.handleClose.bind(this, "delete")}
              >
                Delete
                </MenuItem>
            </Menu>
          </div>
        </Card>
      </div>
    );
  }
}
