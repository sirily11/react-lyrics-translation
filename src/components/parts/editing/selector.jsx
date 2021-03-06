import React, { Component } from "react";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default class Selector extends Component {
  constructor() {
    super();
    this.state = {
      mode: ""
    };
  }
  handleChange = event => {
    this.setState({ mode: event.target.value });
  };

  createMenu() {
    return this.props.selections.map(selection => {
      return (
        <MenuItem key={selection.mode} value={selection.mode}>
          {selection.text}
        </MenuItem>
      );
    });
  }

  render() {
    return (
      <div>
        <FormControl className="selector" fullWidth>
          <InputLabel>{this.props.title}</InputLabel>
          <Select
            value={this.state.mode}
            onChange={this.handleChange}
            input={<Input name="mode" />}
          >
            {this.createMenu()}
          </Select>
        </FormControl>
      </div>
    );
  }
}
