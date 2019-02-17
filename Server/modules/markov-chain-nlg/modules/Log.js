var File = require ("./File.js").File;
var path = require("path");

var logRoot = path.resolve(__dirname, '../logs');

var paths = {
  log: logRoot + "/log.out",
  err: logRoot + "/error.out"
};

class Log {
  static msg (...message) {
    return this._doLog (paths.log, ...message);
  }

  static error (...message) {
    return this._doLog (paths.err, ...message);
  }

  static _doLog (path, ...msg) {
    var message = msg.join (" ");

    if (!this._didInit) {
      this._init ();
      this._messages.push (message);
    } else {
      File.write (path, message + "\n").then (()=>{}, console.error);
    }
  }

  static _init () {
    File.makeDir (logRoot).then (()=>{
      var message = this._messages.join ("\n");

      this._didInit  = true;
      this._messages = [ ];

      if (message === "") return;

      File.write (paths.log, message).then (()=>{}, console.error);
    });
  }
}

Log._didInit = false;
Log._messages = [ ];

module.exports.Log = Log;
