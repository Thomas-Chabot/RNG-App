var File  = require ("./modules/File.js").File;
var Arr   = require ("./modules/ArrayHelper.js");
var Log   = require ("./modules/Log.js").Log;
var Chain = require ("./chaining/Chain.js").Chain;
var Backoff = require ("./chaining/Backoff.js").Backoff;
var Training = require ("./chaining/Training.js").Train;
var Generator = require ("./chaining/Generator.js").Generator;

const K = 5;
const MIN_BACKOFF = 1;
const MIN_OPTS = 2;

var startWords;

class MarkovChain {
  constructor(){
    this._chain = new Chain({minOpts: MIN_OPTS});
    this._generator = new Generator(this._chain, K, startWords);
    this._training = new Training(this._chain);
    this._backoff = new Backoff(this._chain, MIN_OPTS);
  }

  train(data, numWordsInChain){
    if (!numWordsInChain) numWordsInChain = K;
    if (!Array.isArray(data)) data = [data];

    var startingWords = [ ];
    if (data.length === 1 && Array.isArray (data [0])) data = data [0];

    for (var review of data) {
      if (review === '') continue;
      this._training.train (review, numWordsInChain);

      startingWords.push (review.split(" ")[0]);
    }

    this._generator.addWords(startingWords);
    return startingWords;

  }

  backoff(){
    this._backoff.apply (MIN_BACKOFF);
  }

  generate(maxLen){
    return this._generator.generate(maxLen);
  }

  trainTxt(txtFile, split, numWordsInChain){
    if (!txtFile) return false;
    if (!split) split = "\n";

    return new Promise ((fulfill, reject) => {
      File.read (txtFile).then ((data) => {
        data = data.replace(/\r/g, "");
        this.train (data.split (split), numWordsInChain);
        fulfill ();
      }, reject);
    });
  }

  trainJSON(filePath, numWordsInChain){
    if (!filePath) return false;

    return new Promise ((fulfill, reject) => {
      try{
        File.readJSON(filePath).then ((data) => {
          this.train (data, numWordsInChain);
          fulfill();
        }, reject);
      } catch (err) {
        reject (err);
      }
    });
  }
}

module.exports = MarkovChain;
