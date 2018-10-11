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
      suggestions: []
    };
  }
  componentDidMount() {
    this.setState({
      value: this.props.line_translation
    });
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

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
    console.log(this.props.autoSuggestions);
    return inputLength === 0
      ? []
      : this.props.autoSuggestions.filter(
          suggestion =>
            suggestion.toLowerCase().slice(0, inputLength) === inputValue
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
          getSuggestionValue={this.getSuggestions}
          renderSuggestion={suggestions => (
            <MenuItem>{suggestions.name}</MenuItem>
          )}
          inputProps={{
            value: this.state.value,
            onChange: this.onChange,
            label: this.props.line_content
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
          renderInputComponent={props => (
            <TextField
              {...props}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>
    );
  }
}
