const express = require('express');
const app = express();

// Serve static assets
app.use('/public', express.static(__dirname + '/public'));

// Serve HTML on the root path
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Serve JSON at /json
app.get('/json', (req, res) => {
  let message = 'Hello json';

  // Read MESSAGE_STYLE inside the route handler
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    message = message.toUpperCase();
  }

  res.json({ message });
});

module.exports = app;
