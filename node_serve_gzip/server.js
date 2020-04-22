// import express and init server using express()
const express = require("express");
const server = express();

const compression = require('compression');

const fs = require('fs');
const zlib = require('zlib');

const port = 5000;

// SOLUTION 1:
// server.use(compression());
server.use(express.static("public"));

// SOLUTION 2:
// gzip it manually
fs.createReadStream('public/main.js')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('public/compressed/main.js.gz'));

server.get("/", function (req, res) {
  console.log('File compressed');
  res.sendFile(__dirname + "/index.html");
});


// SOLUTION 3: express?
// JS files - compress
// server.get("*.js", function (req, res, next) {
//   console.log("JS!");
//   req.url = req.url + '.gz';
//   res.set('Content-Encoding', 'gzip');
//   res.set('Content-Type', 'text/javascript');
//   next();
// });

server.listen(port, function () {
  // Callback function
  console.log("Running server at " + port);
});
