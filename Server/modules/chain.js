const MarkovChain = require("./markov-chain-nlg");

class Chain {
  constructor(){
    this._chains = { };
  }
  getNames(){ return Object.keys(this._chains); }
  addChain(name, dataFile){
    let chain = new MarkovChain();
    chain.trainJSON(dataFile);
    chain.backoff();

    this._chains[name] = chain;
  }

  generate(name, maxLen){
    let chain = this._chains[name];
    if (!chain) return null;

    return chain.generate(maxLen);
  }
}

module.exports = Chain;
