import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
import Collapse from "@material-ui/core/Collapse";
import { testURL } from "./settings/settings";
import $ from "jquery";

export default class DialogAuth extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      errorShow: false,
      errorMessage: ""
    };
  }

  handleConfirm(e) {
    e.preventDefault();
    let pas = this.state.password;
    let use = this.state.userName;
    if (pas === "" || use === "") {
      this.setState({
        errorShow: true,
        errorMessage: "Please enter the password or username"
      });
    } else {
      let url = "http://127.0.0.1:8000/";
      if (this.props.title.includes("Sign")) {
        url += "post/sign_up";
        console.log("contains sign_up");
      } else {
        url += "post/login";
      }
      $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify({
          user_name: use,
          password: pas
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: data => {
          if (data.status !== true) {
            this.setState({
              errorShow: true,
              errorMessage: data.info
            });
          } else {
            this.props.login(data.userid, data.user_name);
            this.props.closeDialog();
          }
          console.log(data);
        }
      });
    }
    //
  }

  cancel() {
    this.props.closeDialog();
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleUserNameChange(e) {
    this.setState({ userName: e.target.value });
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.openDialog}>
          <Slide direction="up" in={true} timeout={{ enter: 400 }}>
            <form onSubmit={this.handleConfirm.bind(this)}>
              <div>
                <DialogContent>
                  <h6>{this.props.title}</h6>
                  <Collapse
                    direction="up"
                    in={this.state.errorShow}
                    timeout={{ enter: 400 }}
                  >
                    <p style={{ color: "red" }}>{this.state.errorMessage}</p>
                  </Collapse>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    label="User name"
                    type="text"
                    onChange={this.handleUserNameChange.bind(this)}
                    fullWidth
                  />
                  <TextField
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    onChange={this.handlePasswordChange.bind(this)}
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button color="primary" onClick={this.cancel.bind(this)}>
                    Cancel
                  </Button>
                  <Button type={"submit"} color="primary">
                    {/* {this.props.buttonTitle} */}
                    {this.props.buttonTitle}
                  </Button>
                </DialogActions>
              </div>
            </form>
          </Slide>
        </Dialog>
      </div>
    );
  }
}
