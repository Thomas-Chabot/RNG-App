import React, {Component} from "react";
import Message from "./Message.js";

import "./css/OldMessagesView.css";

class OldMessagesView extends Component {
  constructor(props){
    super(props);

    this.state = {
      messages: []
    };

    this._currentId = 0
  }

  addMessage(message, data){
    let id = "message-" + (this._currentId + 1);
    this._currentId ++;

    this.setState((prevState)=>{
      return {
        messages: [
          {
            message,
            id: id,
            data: data
          }
        ].concat(...prevState.messages)
      }
    });

    return id;
  }

  reset(){
    this.setState({messages: [ ]});
  }
  attachData(id, data){
    this.setState((state) => {
      let message = this._findStateData(state.messages, id);
      message.data = data;

      return state;
    });
  }
  _findStateData(state, id){
    for (let message of state){
        if (message.id === id){
          return message;
        }
    }
    return null;
  }

  render(){
    let messages = this.state.messages.map((data, index)=>
      <Message key={"message-" + index} text={data.message} data={data.data}
               onClick={this.props.onClick}
               rowType={index % 2 === 0 ? "dark" : "light"} />
    );

    return <div id="OldMessagesView" className="flex-grow">
      <div className="messages-container">
        {messages}
      </div>
    </div>;
  }
}

export default OldMessagesView;
