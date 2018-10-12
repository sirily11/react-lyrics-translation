import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import Grow from "@material-ui/core/Grow";
import $ from "jquery";
import ProjectCard from "./projectcard";
import Navbar from "./navbar";
import Startcard from "./Startcard";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      isloaded: false
    };
  }

  componentDidMount() {
    $.getJSON(
      `https://api.mytranshelper.com/api/get_all_projects_list/${
        this.props.userID
      }`
    ).done(data => {
      this.setState({ projects: data, isloaded: true });
      $("#musiclist-loadingbar").fadeOut(200);
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
        />
      );
    });
  }

  render() {
    return (
      <div>
        <Navbar icon="menu" title={this.props.languageTranslation.title} />
        <div className="page-content">
          <Startcard languageTranslation={this.props.languageTranslation} />
          <div>
            <div>
              <i className="material-icons mdl-chip__contact">list</i>
              {this.props.languageTranslation.projectTag}
            </div>

            <Fade in={!this.state.isloaded} timeout={{ enter: 0, exit: 2000 }}>
              <CircularProgress size={30} />
            </Fade>
          </div>
          <Grow in={this.state.isloaded}>
            <div className="row">{this.createProjectCard()}</div>
          </Grow>
        </div>
      </div>
    );
  }
}
