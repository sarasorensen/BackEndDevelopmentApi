const express = require('express');
const app = express();

// Serve the index.html file on GET requests to the root path
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

module.exports = app;
