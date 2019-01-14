import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  TextField,
  DialogContent,
  Button,
  LinearProgress,
  IconButton,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import AddPhotoAlternate from "@material-ui/icons/AddPhotoAlternate";
import $ from "jquery";
import settings from "../../settings/settings";


export default class NewProject extends Component {
  constructor() {
    super();
    this.state = {
      artist: "",
      title: "",
      lyrics: "",
      img: "",
      uploading: false
    };
  }

  close() {
    this.setState({uploading : false})
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
    let img = this.state.img;
    let url = settings.getURL("post/create_project");
    this.setState({
      uploading: true
    });
    
    $.post(url,{
      userID : this.props.userID,
      title: title,
      artist : artist,
      lyrics: JSON.stringify(lyrics),
      userID: this.props.userID,
      img: img 
    }, (data)=>{
      this.props.update(artist, title);
      this.setState({
        uploading: false
      });
      if(data.status === true){
        this.close();
      }
    })

  }

  render() {
    return (
      <div>
        <Dialog open={this.props.open}>
          <DialogContent>
            <div className="row">
              <div className="col-6">
                {this.props.languageTranslation.dialogTitleText}
              </div>
              <div className="col-4">
                <img
                  height="70px"
                  width="70px"
                  style={{backgroundColor: "grey"}}
                  src={this.state.img}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <TextField
                  id="artist"
                  onChange={this.onChange.bind(this)}
                  label={this.props.languageTranslation.artistText}
                />
              </div>
              <div className="col-5">
                <TextField
                  id="title"
                  onChange={this.onChange.bind(this)}
                  label={this.props.languageTranslation.songText}
                />
              </div>
              <div
                className="col-2"
                style={{ position: "relative", overflow: "hidden" }}
              >
                <IconButton>
                  <AddPhotoAlternate />
                  <input
                    style={{ position: "absolute", opacity: 0 }}
                    onChange={e =>{
                      let reader = new FileReader()
                      let file = e.target.files[0]
                      reader.onloadend = () => {
                        this.setState({
                          img : reader.result
                        })
                      }
                      reader.readAsDataURL(file)
                    }}
                    type="file"
                  />
                </IconButton>
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
