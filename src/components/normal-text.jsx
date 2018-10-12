import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Popper from "@material-ui/core/Popper";

export default class NormalText extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: [],
      autoSuggestions: []
    };
    this.getSuggestionValue = suggestion => suggestion.name;
  }
  componentDidMount() {
    this.setState({
      value: this.props.line_translation,
      autoSuggestions: this.props.autoSuggestions
    });
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onUnfoucus(e) {
    this.props.update({
      index: this.props.index,
      content: e.target.value
    });
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : this.state.autoSuggestions.filter(
          suggestion =>
            suggestion.content.toLowerCase().slice(0, inputLength) ===
            inputValue
        );
  }

  render() {
    const { value, suggestions } = this.state;
    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={suggestion => suggestion.content}
          renderSuggestion={suggestions => {
            return (
              <MenuItem component="div">
                <div>{suggestions.content}</div>
              </MenuItem>
            );
          }}
          inputProps={{
            value: value,
            onChange: this.onChange,
            label: this.props.line_content
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
          renderInputComponent={props => {
            return (
              <TextField
                {...props}
                margin="normal"
                variant="outlined"
                onBlur={this.onUnfoucus.bind(this)}
                fullWidth
              />
            );
          }}
        />
      </div>
    );
  }
}
