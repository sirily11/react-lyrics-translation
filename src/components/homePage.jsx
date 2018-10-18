import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import Grow from "@material-ui/core/Grow";
import $ from "jquery";
import ProjectCard from "./projectcard";
import Navbar from "./navbar";
import Startcard from "./Startcard";
import NewProject from "./newProject";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      isloaded: false,
      openCreateDialog: false,
      warning: ""
    };
  }

  componentWillMount() {
    if (this.props.loginStatus) {
      this.getProject(this.props.userID);
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.loginStatus != newProps.loginStatus) {
      if (this.props.loginStatus === false) {
        this.getProject(newProps.userID);
      } else {
        this.setState({
          projects: []
        });
        sessionStorage.removeItem("projectsData");
      }
    }
  }

  getProject(userID) {
    $.getJSON(
      `https://api.mytranshelper.com/api/get_all_projects_list/${userID}`
    )
      .done(data => {
        this.setState({ projects: data, isloaded: true });
        sessionStorage.setItem(
          "projectsData",
          JSON.stringify({
            projects: data
          })
        );
        $("#musiclist-loadingbar").fadeOut(200);
      })
      .fail(() => {
        let response = sessionStorage.getItem("projectsData");
        if (response !== null) {
          let projects = JSON.parse(response);
          this.setState({
            projects: projects
          });
        }
      });
  }

  removeHandler(artist, title) {
    let projects = this.state.projects;
    for (let i = 0; i < projects.length; i++) {
      let project = projects[i];
      if (project.title == title && project.artist == artist) {
        projects.splice(i, 1);
        this.setState({
          projects: projects
        });
      }
    }
  }

  addProject(artist, title) {
    let projects = this.state.projects;
    projects.push({
      title: title,
      artist: artist
    });
    this.setState({
      projects: projects
    });
  }

  openCreateDialog() {
    if (this.props.loginStatus !== true) {
      this.setState({
        warning: this.props.languageTranslation.not_login
      });
    } else {
      this.setState({
        openCreateDialog: true
      });
    }
  }

  handleWarningClose() {
    this.setState({
      warning: ""
    });
  }

  closeDialog() {
    console.log("close");
    this.setState({
      openCreateDialog: false
    });
  }

  createProjectCard() {
    return this.state.projects.map(project => {
      return (
        <ProjectCard
          key={project.title}
          title={project.title}
          artist={project.artist}
          loadBtn={this.props.languageTranslation.loadProjectText}
          userID={this.props.userID}
          remove={this.removeHandler.bind(this)}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <Navbar
          icon="menu"
          title={this.props.languageTranslation.title}
          languageTranslation={this.props.languageTranslation}
          userName={this.props.userName}
          loginStatus={this.props.loginStatus}
          login={this.props.login}
          logout={this.props.logout.bind(this)}
        />
        <div className="container-fluid">
          <NewProject
            open={this.state.openCreateDialog}
            close={this.closeDialog.bind(this)}
            languageTranslation={this.props.languageTranslation}
            userID={this.props.userID}
            userName={this.props.userName}
            update={this.addProject.bind(this)}
          />
          <Startcard
            openDialog={this.openCreateDialog.bind(this)}
            languageTranslation={this.props.languageTranslation}
          />
          <div>
            <div>
              <i className="material-icons mdl-chip__contact">list</i>
              {this.props.languageTranslation.projectTag}
              <Fade
                in={!this.state.isloaded}
                timeout={{ enter: 0, exit: 2000 }}
              >
                <CircularProgress hidden={!this.props.loginStatus} size={30} />
              </Fade>
            </div>
          </div>
          <Grow in={this.state.isloaded}>
            <div className="row">{this.createProjectCard()}</div>
          </Grow>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.warning !== ""}
            autoHideDuration={6000}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">{this.state.warning}</span>}
            onClose={this.handleWarningClose.bind(this)}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleWarningClose.bind(this)}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </div>
      </div>
    );
  }
}
