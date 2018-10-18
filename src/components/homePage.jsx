import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import Grow from "@material-ui/core/Grow";
import $ from "jquery";
import ProjectCard from "./projectcard";
import Navbar from "./navbar";
import Startcard from "./Startcard";
import NewProject from "./newProject";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      isloaded: false,
      openCreateDialog: false
    };
  }

  componentWillMount() {
    $.getJSON(
      `https://api.mytranshelper.com/api/get_all_projects_list/${
        this.props.userID
      }`
    ).done(data => {
      this.setState({ projects: data, isloaded: true });
      $("#musiclist-loadingbar").fadeOut(200);
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
    this.setState({
      openCreateDialog: true
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
                <CircularProgress size={30} />
              </Fade>
            </div>
          </div>
          <Grow in={this.state.isloaded}>
            <div className="row">{this.createProjectCard()}</div>
          </Grow>
        </div>
      </div>
    );
  }
}
