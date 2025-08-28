// Load environment variables from .env for local development
require('dotenv').config();

const express = require('express');
const app = express();

// Serve static files from /public
app.use('/public', express.static(__dirname + '/public'));

// Serve HTML on the root path
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Serve JSON on /json
app.get('/json', (req, res) => {
  // Read MESSAGE_STYLE inside the handler
  let message = 'Hello json';
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    message = message.toUpperCase();
  }

  res.json({ message });
});

module.exports = app;
