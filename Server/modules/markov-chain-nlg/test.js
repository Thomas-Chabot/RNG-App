var MarkovChain = require ("./main.js");
var main = new MarkovChain();
console.log ("Training");
main.train("word1 word2 word3 word4");
  console.log ("Generating");
  console.log (main.generate (250));
/*}, (err) => {
  console.error ("Encountered an error during testing: ", err);
})
*/
