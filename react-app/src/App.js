import React, { Component } from 'react';
import './App.css';
import Container from "./components/Container.js";
import ContentWindow from "./components/ContentWindow.js";
import WarningsView from "./components/WarningsView.js"
import TextEntryBox from "./components/TextEntryBox.js";
import OldMessagesView from "./components/OldMessagesView.js";
import DataStore from "./lib/data.js";

import Request from "./lib/Request.js";

let url = "http://localhost:8000";
let messageType = "Weird Al";
let request = new Request(url);

let dataStore = new DataStore();

class App extends Component {
  handleTextChange = value => {

  }
  handleMessageClick = value => {
    request.get("/generate/" + messageType).then((data)=>{
      this._olderMessages.addMessage(data.message);
      dataStore.add(messageType, data.message);
    });
  }
  onMessageClick = data => {
    //this._updateData(data);
  }
  changeGenerator = data => {
    messageType = data;

    this._olderMessages.reset();

    let olderMessages = dataStore.get(messageType);
    if (!olderMessages) return;
    for (let message of olderMessages){
      this._olderMessages.addMessage(message, message);
    }
  }
  loadGenerators() {
    request.get("/generator-names").then((data)=>{
      for (let name of data){
        this._generatorNames.addMessage(name, name);
      }

      messageType = data[0];
    })
  }

  _updateData(result){

  }

  componentDidMount(){
    this.loadGenerators();
  }

  render() {
    return (
      <div className="App">
        <Container>
          <TextEntryBox placeholder="test" ref={(e)=>{ this._textbox=e; }}
            onClick={this.handleMessageClick} />

          <ContentWindow>
            <OldMessagesView ref={(e)=>{ this._olderMessages=e; }}
                             onClick={this.onMessageClick} />
            <OldMessagesView ref={(e)=>{ this._generatorNames=e; }}
                             onClick={this.changeGenerator} />
          </ContentWindow>
        </Container>
      </div>
    );
  }
}

export default App;
