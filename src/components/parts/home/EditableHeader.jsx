import React, { Component } from "react";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";

export default class EditableHeader extends Component {
  constructor() {
    super();
    this.state = {
      editTitle: false,
      editArtist: false
    };
    this.title = null
    this.artist = null
  }

  render() {
    return (
      <div className="row editable-header">
         <h4
          ref={input => {
            this.artist = input;
          }}
          className="project-title"
          contentEditable={this.state.editArtist}
          onDoubleClick={() => {
            this.artist.focus()
            this.setState({ editArtist: true });
          }}
          onBlur={()=>{
            console.log(this.artist.innerText)
            this.setState({ editArtist: false });
          }}
        >
          {this.props.artist}
        </h4>
        <h4 className="project-title">-</h4>
        <h4
          ref={input => {
            this.title = input;
          }}
          className="project-title pt-0"
          contentEditable={this.state.editTitle}
          onDoubleClick={() => {
            this.title.focus()
            this.setState({ editTitle: true });
          }}
          onBlur={()=>{
            console.log(this.title.innerText)
            this.setState({ editTitle: false });
          }}
        >
          {this.props.title}
        </h4>
     
      </div>
    );
  }
}
