import React, { Component } from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BookIcon from "@material-ui/icons/Book";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import EditIcon from "@material-ui/icons/Edit";

import Slide from "@material-ui/core/Slide";
import { Link } from "react-router-dom";

export default class DrawerList extends Component {
  login(e) {
    this.props.dialog("Login", "login");
  }

  signUp(e) {
    this.props.dialog("Sign Up", "sign Up");
  }

  renderLogBtn() {
    if (this.props.loginStatus === false) {
      return (
        <div>
          <ListItem
            button
            style={{ marginRight: 100 }}
            onClick={e => {
              this.login(e);
            }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <span>{this.props.languageTranslation.login_btn}</span>
          </ListItem>
          <ListItem
            button
            style={{ marginRight: 100 }}
            onClick={e => {
              this.signUp(e);
            }}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <span>{this.props.languageTranslation.signUp_btn}</span>
          </ListItem>
        </div>
      );
    } else {
      return (
        <ListItem
          button
          style={{ marginRight: 100 }}
          onClick={this.props.logout.bind(this)}
        >
          <ListItemIcon>
            <CallReceivedIcon />
          </ListItemIcon>
          <span>{this.props.languageTranslation["logout_btn"]}</span>
        </ListItem>
      );
    }
  }

  render() {
    return (
      <div width="">
        <List component="nav">
          <Slide direction={"right"} in={true} timeout={{ enter: 400 }}>
            <div>
              <ListItem button style={{ marginRight: 100 }}>
                <h6>
                  {this.props.languageTranslation["welcomeTextDrawer"] +
                    " " +
                    this.props.userName}
                </h6>
              </ListItem>
              <Divider />
              <ListItem button style={{ marginRight: 100 }}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <span>{this.props.languageTranslation["home"]}</span>
              </ListItem>
              <Link to="/document">
                <ListItem button style={{ marginRight: 100 }}>
                  <ListItemIcon>
                    <BookIcon />
                  </ListItemIcon>
                  <span>{this.props.languageTranslation["logs"]}</span>
                </ListItem>
              </Link>
              {this.renderLogBtn()}
            </div>
          </Slide>
        </List>
      </div>
    );
  }
}
