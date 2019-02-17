var Arr = require ("../modules/ArrayHelper.js");
var Log = require ("../modules/Log.js").Log;

class Chain {
  constructor(opts){
    this._chains  = { };
    this._didInit = true;

    this._minOptions = opts.minOpts;
  }

  has (key){ return this._chains [this._chain(key)] !== undefined; }
  get (key) { return this._chains [this._chain(key)]; }
  update (key, value){ this._chains [this._chain(key)] = value; }
  delete (key){ delete this._chains [this._chain(key)]; }
  remove (key) { this._chains [this._chain (key)] = null; }
  clear(){ this._chains = { }; }

  add (key, values) {
    var origValues = this.get (key);
    var newValues = origValues ? origValues.concat (values) : values;

    this.update (key, newValues);
  }

  each (f) {
    for (var key of this._chains)
      f (key, this._chains [key]);
  }

  getWords(){ return Object.keys (this._chains); }
  getRelationships(){ return this._chains; }

  addTransition (v, w) {
    if (!v) return;

    var t = this.has (v) ? this.get(v) : [ ];
    t.push (w);

    this.update (v, t);
  }

  next (v) {
    if (!this.has (v)) return null;

    var tab = this.get (v);
    return Arr.random (tab);
  }

  toString () {
    var chains = "";
    this.each ((word, values) => {
      chains += word + ": " + values.join(", ") + "\n";
    });
    return chains;
  }

  _chain (key) {
    return key;
  }

  _copyWords (words) {
    var res = [ ];
    for (var word of words) {
      res.push (word.slice (0));
    }
    return res;
  }
}

module.exports.Chain = Chain;
