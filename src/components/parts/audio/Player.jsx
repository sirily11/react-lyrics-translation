import React, { Component } from "react";
import { IconButton } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Slider from "@material-ui/lab/Slider";

export default class Player extends Component {
  constructor() {
    super();
    this.state = {
      currentTime: 0,
      playing: false,
      ready: false
    };
    this.music = null;
    this.player = null;
    this.totalTime = 0;
  }

  componentDidMount() {
    this.music = this.props.musicInstance;
    this.setState({ currentTime: this.props.playingTime });
  }

  componentDidUpdate(prevProps) {
    if (this.props.songID !== prevProps.songID) {
      this.music.setQueue({ song: this.props.songID }).then(queue => {
        this.setState({ playing: true });
        this.music.play();
        this.music.addEventListener("mediaCanPlay", e => {
          this.total = e.currentPlaybackDuration;
          this.player = e.target;
          this.totalTime = e.target.duration;
          this.setState({ ready: true });
          this.player.ontimeupdate = () => {
            let portion = (this.player.currentTime / this.totalTime) * 100;
            this.setState({ currentTime: portion });
          };
        });
      });
    }
  }

  componentWillUnmount() {
    if (this.player !== null) {
      this.player.pause();
      this.player.ontimeupdate = () => {};
    }
  }

  handleChange = (event, value) => {
    try{
      console.log(value);
      let portion = value / 100;
      this.player.currentTime = portion * this.totalTime;
      this.setState({ currentTime: value });
    } catch(err){
      console.log(err)
    }
   
  };

  render() {
    return (
      <div>
        <div
        id="title-bar"
          className="row"
          style={{
            backgroundColor: "#ef6c00",
            height: "40px",
            borderRadius: "10px"
          }}
        >
          <label className="ml-auto mr-auto mt-2" style={{ color: "white" }}>
            {" "}
            Now playing {this.props.songName}
          </label>
        </div>
        <div className="row ml-auto mr-auto" style={{ width: "100%" }}
        >
          <div className="col-3 w-100">
            <IconButton
              disabled={!this.state.ready}
              onClick={() => {
                console.log(this.state.playing);
                this.setState({ playing: !this.state.playing });
                if (this.state.playing) {
                  this.player.pause();
                } else {
                  this.player.play();
                }
              }}
            >
              {this.state.playing === true ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
          </div>
          <div style={{position: "absolute", top: 0}}>
            <Slider
              disabled={!this.state.ready}
              value={this.state.currentTime}
              onChange={(e,value)=>{
                this.handleChange(e,value)
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
