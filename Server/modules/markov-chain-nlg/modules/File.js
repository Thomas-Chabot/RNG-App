var fs = require ("fs");
var JSONStream = require ("JSONStream");

class File {
  static read (filePath) {
    return new Promise((fulfill, reject) => {
      fs.readFile (filePath, (err, contents) => {
        if (err) reject (err);
        else {
          fulfill (contents.toString ());
        }
      });
    });
  }

  static readJSON (filePath, parsingRules) {
    return new Promise ((fulfill, reject) => {
      var data = fs.createReadStream(filePath)
                   .pipe (JSONStream.parse (parsingRules));

      var results = [ ];
      data.on ('data', (data) => {
        results.push (data);
      })

      data.on ('end', ()=>{
        fulfill (results);
      });
      /*
      .then ((contents) => {
        try {
          fulfill(JSON.parse (contents.toString ()));
        } catch (e) {
          reject (e);
        }
      }, reject);*/
    });
  }

  static write (filePath, data) {
    return new Promise ((fulfill, reject) => {
      fs.appendFile (filePath, data, (err) => {
        if (err) reject (err);
        fulfill ();
      });
    });
  }

  static makeDir (directoryPath) {
    return new Promise ((fulfill, reject) => {
      fs.mkdir(directoryPath, function(err) {
          if (err) {
              if (err.code == 'EEXIST') fulfill(); // ignore the error if the folder already exists
              else reject(err); // something else went wrong
          } else fulfill(); // successfully created folder
      });
    });
  }
}

module.exports.File = File;
