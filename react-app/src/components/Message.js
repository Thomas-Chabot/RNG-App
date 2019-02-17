import React, {Component} from "react";
import "./css/Message.css";

class Message extends Component {
  handleClick = event => {
    this.props.onClick(this.props.data);
  }

  render(){
    let content = this.props.text.split("\n").map((c,i)=>{
      return <div className="message" key={i}>{c}</div>
    })
    return <div className={"row row-" + this.props.rowType} onClick={this.handleClick}>
      {content}
    </div>;
  }
}

export default Message;
