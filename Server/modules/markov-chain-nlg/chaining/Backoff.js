var Chain = require ("./Chain.js").Chain;
var Seq   = require ("../modules/Sequence.js");
var Log   = require ("../modules/Log.js").Log;

class Backoff {
  constructor (chain, minWords) {
    this._chain = chain;
    this._min = minWords;
  }

  apply (minLength) {
    var chains = this._chain.getRelationships ();
    this._chain.clear ();
    this._doApply (chains, minLength);
  }

  _doApply (keys, minLen) {
    var needsUpdate = true;
    while (needsUpdate) {
      [keys, needsUpdate] = this._shorten (keys, minLen);

      Log.msg ("Continuing to next apply level");
    }
  }

  _shorten (keys, minLen) {
    var shortened = { };
    var didUpdate = false;

    for (var seq in keys) {
      var options = keys [seq];
      if (options.length >= this._min) {
        this._update (seq, options);
        continue;
      }

      if (Seq.length (seq) <= minLen)
        break;

      var short = Seq.shorten (seq);
      if (!short) {
        this._update (seq, options);
        continue;
      }

      this._merge (shortened, short, options);
      didUpdate = true;
    }

    return [shortened, didUpdate];
  }

  _update (seq, options) {
    this._chain.update (seq, options);
  }

  _merge (results, key, opts) {
    var newOpts = results[key] ? results[key].concat (opts) : opts.slice ();
    results [key] = newOpts;
  }
}

module.exports.Backoff = Backoff;
