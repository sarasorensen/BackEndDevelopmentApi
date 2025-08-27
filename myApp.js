const express = require('express');
const app = express();

// Serve static files from the /public folder
app.use('/public', express.static(__dirname + '/public'));

// Serve the HTML file on GET requests to the root path
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

module.exports = app;
