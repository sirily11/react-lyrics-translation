import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import { MenuList, Menu } from "@material-ui/core";
import settings from '../settings/settings';
import $ from 'jquery'

export default class NormalText extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: [],
      anchorEl: null
    };
  }
  componentDidMount() {
    if(this.props.line_translation !== null){
    this.setState({
      value: this.props.line_translation
    });
  }
  }

  onChange(e,) {
    let value = e.target.value;
    let origin = this.props.line_content
    this.setState({
      value: value
    });
    let translated = this.props.translatedLine;
    let suggestions = translated.filter(trans => {
      if (trans.content !== null) {
        if (
          trans.content.includes(value) &&
          trans.content !== value &&
          value !== ""
        ) {
          return trans.content;
        }
      }
    });
    const { currentTarget } = e;
    this.setState({ suggestions: suggestions, anchorEl: currentTarget });
  }

  onUnfoucus(e) {
    this.setState({suggestions: []})
    this.props.update(this.props.index, e.target.value);
  }

  onSuggestClick(e) {
    let value = e.target.id;
    this.setState({
      value: value,
      suggestions: []
    });
  }

  renderSuggestions() {
    return this.state.suggestions.map(suggest => {
      return (
        <MenuItem
          id={suggest.content}
          onClick={this.onSuggestClick.bind(this)}
          key={suggest.index}
        >
          {suggest.content}
        </MenuItem>
      );
    });
  }

  render() {
    return (
      <div>
        <TextField
          aria-describedby="0"
          value={this.state.value}
          label={this.props.line_content}
          margin="normal"
          variant="outlined"
          onBlur={this.onUnfoucus.bind(this)}
          onChange={this.onChange.bind(this)}
          fullWidth
        />
        <Popper
          id="0"
          open={this.state.suggestions.length !== 0}
          anchorEl={this.state.anchorEl}
          placement="bottom-start"
          style={{zIndex: 1}}
          transition
        >
          <Paper> {this.renderSuggestions()}</Paper>
        </Popper>
      </div>
    );
  }
}
