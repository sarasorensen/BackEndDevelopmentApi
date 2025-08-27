// myApp.js
const express = require('express'); // import Express
const app = express(); // create an Express app

// Serve "Hello Express" on the root path
app.get('/', function(req, res) {
  res.send('Hello Express');
});

// The app.listen() is already handled in server.js for testing
