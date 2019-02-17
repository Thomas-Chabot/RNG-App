import React, {Component} from "react";
import VerticalFlex from "./flex/Vertical.js";
import "./css/Warnings.css";

class Warning extends Component {
  constructorst(props){
    super(props);
    this.minValue = 0.5;
  }

  check(){
    return this.props.dataValue > this.minValue;
  }

  render(){
    return <span className="warning-box" >
      <input type="checkbox" checked={this.check()} value={this.props.name} readOnly="readonly" />
      <label className="warning-label">{this.props.name}</label>
    </span>
  }
}

class Warnings extends Component {
  constructor(props){
    super(props);
    this.state = {
      warnings: [ ]
    };
  }

  addDataPoint(name, value){
    this.setState((state)=>{
      return state.warnings.push({name, value});
    });
  }

  reset(){
    this.setState({
      warnings: [ ]
    });
  }

  render(){
    let data = this.state.warnings.map((warning, i)=>{
      return <Warning name={warning.name} dataValue={warning.value} key={i} />
    });

    return <div className="warnings-box">
      {data}
    </div>
  }
}

export default Warnings;
