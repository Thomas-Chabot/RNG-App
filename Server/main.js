const express = require("express");
const Chains = require("./modules/chain.js");
const app = express();

const port = 8000;

let chains = new Chains();
chains.addChain('weird-al', './data/weird-al.json');
chains.addChain('alice-cooper', './data/alice-cooper.json');

function sendJSON(res, data){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/generator-names', (req,res)=>{
  sendJSON(res, ['weird-al', 'alice-cooper', 'dio']);
})

app.get('/generate/:name', (req,res)=>{
  sendJSON(res, {message: chains.generate(req.params.name)});
});

app.listen(port, ()=>{
  console.log("listening on port ", port);
});
