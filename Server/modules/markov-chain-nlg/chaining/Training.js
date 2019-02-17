var Chain = require ("./Chain.js").Chain;
var Kgram = require ("./Kgram.js").Kgram;
var Seq   = require ("../modules/Sequence.js");

class Train {
  constructor (chain, k) {
    this._chain = chain;
    this._kgram = new Kgram(5);
  }

  train(words){
    this._kgram.reset();
    
    for (var word of words.split(" ")) {
      this._chain.addTransition (this._kgram.toString (), word);
      this._kgram.addToChain (word);
    }
  }

  _parse (wordset) {
    return Seq.parse (wordset);
  }
}

module.exports.Train = Train;
