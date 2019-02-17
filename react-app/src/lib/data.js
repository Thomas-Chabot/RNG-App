class Data {
  constructor(){
    this._datastores = { };
  }

  add(name, message){
    if (!this._datastores[name])
      this._datastores[name] = [ ];

    this._datastores[name].push(message);
  }

  get(name){
    return this._datastores[name];
  }
}

export default Data;
