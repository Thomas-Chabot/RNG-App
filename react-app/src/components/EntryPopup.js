import React, {Component} from "react";
import VerticalFlex from "./flex/Vertical.js";
import "./css/EntryPopup.css";

class EntryPopup extends Component {
  constructor(props){
    super(props);

    this.state = {
      value: ""
    }
  }

  get value(){ return this.state.value; }
  set value(t){ this.setState({value: t}); }

  clear(){ this.value = ""; }
  
  animateIn(){

  }
  animateOut(){

  }

  handleTextChange = event => {
    let value = event.target.value;
    this.setState({value});

    this.props.OnTextChange(value);
  }
  handleSendMessage = event => {
    let value = this.value;
    this.props.OnSendMessage(value);
  }

  render(){
    return <div className="entry-container">
      <textarea className="entry-box" type="text"
                value={this.state.value}
                placeholder={this.props.placeholder}
                ref={(e)=>{ this._textbox = e; }}
                onChange={this.handleTextChange} />
      <input className="send-button" type="button" value="Send Message" onClick={this.handleSendMessage} />
    </div>;
  }
}

export default EntryPopup;
