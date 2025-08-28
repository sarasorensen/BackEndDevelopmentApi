require('dotenv').config();
const express = require('express');
const app = express();


// Serve static files from /public
app.use('/public', express.static(__dirname + '/public'));

// Serve HTML file on the root path
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Serve JSON on /json route
app.get("/json", (req, res) => {
  const messageStyle = process.env.MESSAGE_STYLE;
  const message = messageStyle === "uppercase" ? "HELLO JSON" : "Hello json";
  res.json({ message });
});

module.exports = app;