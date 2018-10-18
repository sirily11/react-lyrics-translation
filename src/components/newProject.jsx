import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  TextField,
  DialogContent,
  Button,
  LinearProgress
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import $ from "jquery";
import settings from "./settings/settings";

export default class NewProject extends Component {
  constructor() {
    super();
    this.state = {
      artist: "",
      title: "",
      lyrics: "",
      uploading: false
    };
  }

  close() {
    this.props.close();
  }

  onChange(e) {
    let id = e.target.id;
    let content = e.target.value;
    switch (id) {
      case "artist":
        this.setState({
          artist: content
        });
        break;
      case "title":
        this.setState({
          title: content
        });
        break;
      case "lyrics":
        this.setState({
          lyrics: content
        });
        break;
    }
  }
  handleSubmit(e) {
    let lyrics = this.state.lyrics.split("\n");
    let artist = this.state.artist;
    let title = this.state.title;
    let url = settings.getURL("post/upload");
    this.setState({
      uploading: true
    });
    console.log(url);
    $.ajax({
      type: "POST",
      url: url,
      data: JSON.stringify({
        userID: this.props.userID,
        name: this.props.userName,
        title: title,
        artist: artist,
        lyrics: lyrics
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      complete: data => {
        this.props.update(artist, title);
        this.setState({
          uploading: false
        });
        this.close();
      }
    });
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.open}>
          <DialogContent>
            <h6>{this.props.languageTranslation.dialogTitleText}</h6>
            <div className="row">
              <div className="col-6">
                <TextField
                  id="artist"
                  onChange={this.onChange.bind(this)}
                  label={this.props.languageTranslation.artistText}
                />
              </div>
              <div className="col-6">
                <TextField
                  id="title"
                  onChange={this.onChange.bind(this)}
                  label={this.props.languageTranslation.songText}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <TextField
                  id="lyrics"
                  onChange={this.onChange.bind(this)}
                  label={this.props.languageTranslation.lyricsText}
                  multiline
                  fullWidth
                  rows="20"
                  margin="normal"
                  variant="outlined"
                />
              </div>
            </div>
            <LinearProgress hidden={!this.state.uploading} />
            <div className="row">
              <div className="col-6">
                <Button color="primary" onClick={this.close.bind(this)}>
                  <ClearIcon />
                </Button>
              </div>
              <div className="col-6">
                <Button
                  color="secondary"
                  onClick={this.handleSubmit.bind(this)}
                >
                  <DoneIcon />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
