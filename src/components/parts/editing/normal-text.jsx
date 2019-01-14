import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import { MenuList, Menu, IconButton, Collapse } from "@material-ui/core";
import settings from "../../settings/settings";
import $ from "jquery";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";

export default class NormalText extends Component {
  constructor() {
    super();
    this.state = {
      helpText: "",
      mode: "translate",
      delete: false,
      in: false,
      edit: false,
      value: "",
      original: null,
      suggestions: [],
      anchorEl: null
    };
  }
  componentDidMount() {
    this.setState({
      value: this.props.line_translation,
      original: this.props.line_content !== "" ? this.props.line_content : "   "
    });
  }

  componentDidUpdate(prevProps){
    if(this.props !== prevProps){
      this.setState({
        value: this.props.line_translation,
        original: this.props.line_content !== "" ? this.props.line_content : "   "
      });
    }
  }

  onChange(e) {
    let value = e.target.value;
    let origin = this.props.line_content;
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
    this.setState({
      suggestions: suggestions,
      anchorEl: currentTarget,
      edit: true
    });
  }

  changeOriginal(e) {
    this.setState({ original: e.target.value });
  }

  onUnfoucus(e) {
    if (this.state.edit) {
      this.props.update(this.props.index, e.target.value);
    }
    this.setState({ suggestions: [], in: false, edit: false });
  }

  renderSuggestions() {
    return this.state.suggestions.map(suggest => {
      return (
        <MenuItem
          id={suggest.content}
          onClick={()=>{
            console.log("Clicked")
            this.setState({
              value: suggest.content,
              suggestions: []
            });
          }}
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
        <Collapse
          in={!this.state.delete && this.state.original !== null}
          timeout={{ enter: 0, exit: 300 }}
          mountOnEnter
          unmountOnExit
        >
          <TextField
            helperText={this.state.helpText}
            aria-describedby="0"
            value={
              this.state.mode === "translate"
                ? this.state.value
                : this.state.original
            }
            label={this.state.original}
            margin="normal"
            variant="outlined"
            onBlur={this.onUnfoucus.bind(this)}
            onFocus={() => {
              this.setState({ in: true });
            }}
            onChange={
              this.state.mode === "translate"
                ? this.onChange.bind(this)
                : this.changeOriginal.bind(this)
            }
            fullWidth
          />
          <Popper
            id="0"
            open={this.state.suggestions.length !== 0}
            anchorEl={this.state.anchorEl}
            placement="bottom-start"
            style={{ zIndex: 1 }}
            transition
          >
            <Paper> {this.renderSuggestions()}</Paper>
          </Popper>
          <Collapse in={this.state.in} timeout={400} mountOnEnter unmountOnExit>
            <div className="row mt-0 mb-0">
              <div className="col-6 col-md-3 ml-auto mr-auto pt-0 pb-0">
                <IconButton
                  className=""
                  onClick={() => {
                    this.props.addNewLine(this.props.index);
                  }}
                >
                  <AddCircleIcon />
                </IconButton>
                <IconButton
                  className=""
                  onClick={() => {
                    if (this.state.mode === "translate") {
                      this.setState({
                        helpText: "Edit original text",
                        mode: "edit"
                      });
                    } else {
                      console.log("change")
                      this.props.change(this.props.index, this.state.original)
                      this.setState({
                        helpText: null,
                        mode: "translate"
                      });
                    }
                  }}
                >
                  {this.state.mode === "translate" ? (
                    <EditIcon />
                  ) : (
                    <DoneIcon />
                  )}
                </IconButton>
                <IconButton
                  className=""
                  onClick={() => {
                    this.props.removeLine(this.props.index)
                    this.setState({ delete: true, value: null });
                  }}
                >
                  <RemoveCircleIcon />
                </IconButton>
              </div>
            </div>
          </Collapse>
        </Collapse>
      </div>
    );
  }
}
