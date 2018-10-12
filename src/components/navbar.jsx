import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import { Link } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import blue from "@material-ui/core/colors/blue";

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      drawerOpen: false
    };
  }

  toggleDrawer(e) {
    let prevState = this.state.drawerOpen;
    this.setState({
      drawerOpen: !prevState
    });
  }

  createIcon() {
    if (this.props.icon === "arrowBack") {
      return (
        <Link to={this.props.link}>
          <IconButton color={"inherit"}>
            <ArrowBackIcon />
          </IconButton>
        </Link>
      );
    } else if (this.props.icon === "menu") {
      return (
        <IconButton color={"inherit"}>
          <MenuIcon onClick={this.toggleDrawer.bind(this)} />
        </IconButton>
      );
    } else {
      return;
    }
  }
  render() {
    return (
      <div>
        <AppBar position="static" color={this.props.color}>
          <Toolbar>
            {this.createIcon()}
            <Typography variant="h6" color="inherit">
              {this.props.title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          open={this.state.drawerOpen}
          onClose={this.toggleDrawer.bind(this)}
        >
          <div>{"Some list"}</div>
        </Drawer>
      </div>
    );
  }
}
