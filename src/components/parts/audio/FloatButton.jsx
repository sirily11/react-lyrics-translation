import React, { Component } from "react";
import EditIcon from "@material-ui/icons/Edit";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

export default class FloatButton extends Component {
  constructor() {
    super();
    this.state = { open: false };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    let bottom = window.innerHeight * 0.15 + 10;

    return (
      <div
        className="position-absolute"
        style={{
          right: 10,
          bottom: bottom
        }}
      >
        {/* <SpeedDial color="secondary" className="">
          <EditIcon />
        </SpeedDial> */}
        <SpeedDial
          ariaLabel="SpeedDial example"
          icon={<EditIcon />}
          open={this.state.open}
          onClick={this.handleOpen.bind(this)}
          onBlur={this.handleClose.bind(this)}
          onFocus={this.handleOpen.bind(this)}
          onMouseEnter={this.handleOpen.bind(this)}
          onMouseLeave={this.handleClose.bind(this)}
          direction={"left"}
        >
          <SpeedDialAction
            onClick={()=>{
                this.setState({open: false})
                this.props.openMusicSelector()
            }}
            icon={<LibraryMusicIcon />}
            tooltipTitle="Apple Music"
          />
        </SpeedDial>
      </div>
    );
  }
}
