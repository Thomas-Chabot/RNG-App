/* This is the main window for showing the WarningsView & OldMessagesView */
import React, {Component} from "react";
import HorizontalFlex from "./flex/Horizontal.js";
import "./css/ContentWindow.css";

class ContentWindow extends Component {
  render(){
    return <div className="content-window flex-grow">
      <HorizontalFlex>
        {this.props.children}
      </HorizontalFlex>
    </div>;
  }
}

export default ContentWindow;
