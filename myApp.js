require('dotenv').config(); // Load environment variables
const express = require('express');
const app = express();

// Serve static files from /public
app.use('/public', express.static(__dirname + '/public'));

// Serve HTML file on the root path
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Serve JSON on /json route, applying MESSAGE_STYLE if set
app.get('/json', function(req, res) {
  let message = 'Hello json';
  
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    message = message.toUpperCase();
  }
  
  res.json({ message: message });
});

module.exports = app;
