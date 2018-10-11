import React, { Component } from "react";
import Startcard from "./Startcard";
import $ from "jquery";
import ProjectCard from "./projectcard";
import Navbar from "./navbar";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    $.getJSON(
      `https://api.mytranshelper.com/api/get_all_projects_list/${
        this.props.userID
      }`
    ).done(data => {
      this.setState({ projects: data });
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
            </div>
            <span className="mdl-chip__text lang" id="projectTag">
              {this.props.languageTranslation.projectTag}
            </span>
            <div
              className="mdl-spinner mdl-js-spinner is-active"
              id="musiclist-loadingbar"
            />
          </div>
          <div className="row">{this.createProjectCard()}</div>
        </div>
      </div>
    );
  }
}
