import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MenuIcon from "@material-ui/icons/Menu";
export default class Navbar extends Component {
  createIcon() {
    if (this.props.icon === "arrowBack") {
      return <ArrowBackIcon />;
    } else if (this.props.icon === "menu") {
      return <MenuIcon />;
    } else {
      return;
    }
  }
  render() {
    return (
      <div>
        <AppBar position="static" color={this.props.color}>
          <Toolbar>
            <IconButton color="inherit">{this.createIcon()}</IconButton>
            <Typography variant="h6" color="inherit">
              {this.props.title}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
