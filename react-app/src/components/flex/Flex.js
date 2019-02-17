import React, {Component} from "react";
import "./Flex.css";

class Flex extends Component {
  constructor(props, flexType){
    super(props);

    this.state = {
      flexType
    }
  }

  render(){
    return <div className={"flex flex-" + this.state.flexType}>
      {this.props.children}
    </div>
  }
}

export default Flex;
