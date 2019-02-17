import React, {Component} from "react";
import VerticalFlex from "./flex/Vertical.js";
import "./css/Container.css";

class Container extends Component {
  render(){
    return <div id="container">
      <VerticalFlex>
        {this.props.children}
      </VerticalFlex>
    </div>;
  }
}
//
export default Container;
