require('dotenv').config(); // Make sure this is at the top of your file
const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next(); // important: move to the next middleware/route
});


// Serve static files from /public
app.use('/public', express.static(__dirname + '/public'));

// Serve HTML file on the root path
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Serve JSON on /json route

app.get("/json", (req, res) => {
  const messageStyle = process.env.MESSAGE_STYLE;
  let message = "Hello json";

  if (messageStyle === "uppercase") {
    message = message.toUpperCase();
  }

  res.json({ message });
});

module.exports = app;