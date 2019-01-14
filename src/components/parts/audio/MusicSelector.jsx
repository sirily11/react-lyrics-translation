import React, { Component } from "react";
import $ from "jquery";
import {
  IconButton,
  DialogContent,
  Dialog,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  MobileStepper,
  CircularProgress,
  Fade,
  ButtonBase
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Pagination from "../helper/pagination";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

export default class MusicSelector extends Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      value: null,
      numOfPage: 0,
      displayItems: [],
      currentPage: 0,
      loading: false
    };
    this.music = null;
    this.pagination = null;
  }

  componentDidMount() {
    this.music = this.props.musicInstance;
  }

  search() {
    this.setState({ loading: true });
    this.music.authorize().then(async () => {
      let result = await this.music.api.search(this.state.value, {
        limit: 10,
        types: "songs"
      });
      this.pagination = new Pagination(result.songs.data, 3);
      let items = this.pagination.getCurrentPage();
      this.setState({
        songs: result.songs.data,
        numOfPage: this.pagination.getTotalNumOfPage(),
        displayItems: items,
        loading: false
      });
      console.log(items);
    });
  }

  renderList() {
    return this.state.displayItems.map((item,i) => {
      let url = item.attributes.artwork.url;
      url = url.split("{w}x{h}bb.jpeg");
      url = url[0] + "100x100bb.jpeg";
      return (
        <ListItem 
        key={i + item.attributes.name}
        onClick={()=>{
          this.props.onClick(item.id,item.attributes.name)
        }}>
          <Avatar src={url} style={{ height: 100, width: 100 }} />
          <ListItemText
            primary={item.attributes.name}
            secondary={`${item.attributes.artistName}-${
              item.attributes.albumName
            }`}
          />
        </ListItem>
      );
    });
  }

  renderStepper() {
    return (
      this.state.displayItems.length !== 0 && (
        <MobileStepper
          style={{ backgroundColor: "white" }}
          position="static"
          variant="dots"
          steps={this.state.numOfPage}
          activeStep={this.state.currentPage}
          nextButton={
            <Button
              size="small"
              onClick={() => {
                let currentPage = this.pagination.next();
                let content = this.pagination.getCurrentPage();
                console.log(currentPage);
                this.setState({
                  currentPage: currentPage,
                  displayItems: content
                });
              }}
            >
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={() => {
                let currentPage = this.pagination.prev();
                let content = this.pagination.getCurrentPage();
                console.log(currentPage);
                this.setState({
                  currentPage: currentPage,
                  displayItems: content
                });
              }}
            >
              <KeyboardArrowLeft />
            </Button>
          }
        />
      )
    );
  }

  render() {
    return (
      <div>
        <Dialog fullWidth open={this.props.openDialog}>
          <DialogContent>
            <h4>Apple Music</h4>
            <div className="row ml-auto mr-auto">
              <TextField
                className="col-9 col-md-10"
                id="title"
                label="Title"
                onChange={e => {
                  this.setState({ value: e.target.value });
                }}
              />
              <IconButton
                className="col-3 col-md-2"
                onClick={() => {
                  this.search();
                }}
              >
                <SendIcon />
              </IconButton>
            </div>
            <Fade className="row ml-auto mr-auto" in={this.state.loading}>
              <CircularProgress />
            </Fade>
            <List>{this.renderList()} </List>
            {this.renderStepper()}
            <ButtonBase onClick={()=>{this.props.close()}}>Close</ButtonBase>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
