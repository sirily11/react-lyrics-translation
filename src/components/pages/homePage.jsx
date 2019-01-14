import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  MuiThemeProvider,
  createMuiTheme,
  IconButton,
  Grow,
  Fade,
  Snackbar
} from "@material-ui/core";
import purple from "@material-ui/core/colors/purple";
import $ from "jquery";
import ProjectCard from "../parts/home/projectcard";
import Navbar from "../parts/home/navbar";
import Startcard from "../parts/home/Startcard";
import NewProject from "../parts/home/newProject";
import CloseIcon from "@material-ui/icons/Close";
import settings from "../settings/settings";
import language from '../settings/language';


const theme = createMuiTheme({
  palette: {
    primary: purple
  }
});

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
        localStorage.removeItem("projectsData");
      }
    }
  }

  getProject(userID) {
    $.getJSON(settings.getURL("get/projects"), { user_id: userID })
      .done(data => {
        if (data.projects !== undefined) {
          this.setState({ projects: data.projects, isloaded: true });
          localStorage.setItem(
            "projectsData",
            JSON.stringify({
              projects: data.projects
            })
          );
          $("#musiclist-loadingbar").fadeOut(200);
        }
      })
      .fail(() => {
        let response = localStorage.getItem("projectsData");
        if (response !== null) {
          let projects = JSON.parse(response);
          this.setState({
            projects: projects
          });
        }
      });
  }

  removeHandler(id) {
    let projects = this.state.projects;
    console.log(id);
    for (let i = 0; i < projects.length; i++) {
      let project = projects[i];
      if (project.sid === id) {
        console.log(id)
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
        warning: language.not_login
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
    this.setState({
      openCreateDialog: false
    });
  }

  createProjectCard() {
    if (this.state.projects.length > 0) {
      return this.state.projects.map(project => {
        return (
          <ProjectCard
            sid={project.sid}
            key={project.title}
            title={project.title}
            artist={project.artist}
            image={project.image}
            loadBtn={language.loadProjectText}
            userID={this.props.userID}
            remove={this.removeHandler.bind(this)}
          />
        );
      });
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Navbar
          icon="menu"
          title={language.title}
          languageTranslation={language}
          userName={this.props.userName}
          loginStatus={this.props.loginStatus}
          login={this.props.login}
          logout={this.props.logout.bind(this)}
        />
        <div className="container-fluid">
          <NewProject
            open={this.state.openCreateDialog}
            close={this.closeDialog.bind(this)}
            languageTranslation={language}
            userID={this.props.userID}
            userName={this.props.userName}
            update={this.addProject.bind(this)}
          />
          <Startcard
            openDialog={this.openCreateDialog.bind(this)}
            languageTranslation={language}
          />
          <div>
            <div>
              <i className="material-icons mdl-chip__contact">list</i>
              {language.projectTag}
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
      </MuiThemeProvider>
    );
  }
}
