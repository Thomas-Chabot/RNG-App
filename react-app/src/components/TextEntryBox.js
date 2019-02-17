import React, {Component} from "react";
import VerticalFlex from "./flex/Vertical.js";
import EntryPopup from "./EntryPopup.js";
import "./css/TextEntryBox.css";

class TextEntryBox extends Component {
  constructor(props){
    super(props);

    this.state = {
      value: "",
      expanded: false
    };
  }

  get value(){ return this._textbox.value; }

  clear(){
    if (!this._textbox)
      return;
    this._textbox.clear();
  }

  expand(){
    this.setState({expanded: true})
  }
  minimize(){
    this.setState({expanded: false});
  }

  handleChange = value => {
  }
  handleClick = value => {
    this.props.onClick();
  }

  render(){
    return <input className="entry-box-small" type="button" onClick={this.handleClick}
                  value="Read Message" />
  }
}

export default TextEntryBox;
