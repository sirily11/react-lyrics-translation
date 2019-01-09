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
import DrawerList from "./drawerList";
import DialogAuth from "./dialog";

export default class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      drawerOpen: false,
      dialogOpen: false,
      dialogTitle: "",
      dialogButtonTitle: ""
    };
  }

  toggleDrawer(e) {
    let prevState = this.state.drawerOpen;
    this.setState({
      drawerOpen: !prevState
    });
  }

  handleDialog(title, buttonTitle) {
    console.log("Open");
    this.setState({
      drawerOpen: false,
      dialogOpen: true,
      dialogTitle: title,
      dialogButtonTitle: buttonTitle
    });
  }

  handleCloseDialog() {
    this.setState({
      dialogOpen: false
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
          width="100%"
        >
          <DrawerList
            userName={this.props.userName}
            languageTranslation={this.props.languageTranslation}
            dialog={this.handleDialog.bind(this)}
            loginStatus={this.props.loginStatus}
            logout={this.props.logout}
          />
        </Drawer>
        <DialogAuth
          openDialog={this.state.dialogOpen}
          closeDialog={this.handleCloseDialog.bind(this)}
          title={this.state.dialogTitle}
          buttonTitle={this.state.dialogButtonTitle}
          login={this.props.login}
        />
      </div>
    );
  }
}
