const express = require('express');
const app = express();

// Serve static files from /public
app.use('/public', express.static(__dirname + '/public'));

// Serve HTML file on the root path
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Serve JSON on /json route
app.get('/json', function(req, res) {
  res.json({ message: 'Hello json' });
});

module.exports = app;
