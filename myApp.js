require('dotenv').config(); // Make sure this is at the top of your file
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/name', (req, res) => {
  const firstName = req.body.first;
  const lastName = req.body.last;
  res.json({ name: `${firstName} ${lastName}` });
});



app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next(); // important: move to the next middleware/route
});

app.get('/now', (req, res, next) => {
  // First middleware: add current time to req.time
  req.time = new Date().toString();
  next(); // pass control to the next function in the chain
}, (req, res) => {
  // Final handler: respond with JSON
  res.json({ time: req.time });
});

app.get('/:word/echo', (req, res) => {
  // Grab the route parameter from req.params
  const word = req.params.word;

  // Respond with JSON { echo: word }
  res.json({ echo: word });
});

app.route('/name')
  .get((req, res) => {
    const first = req.query.first;
    const last = req.query.last;
    res.json({ name: `${first} ${last}` });
  })
  .post((req, res) => {
    const first = req.body.first;
    const last = req.body.last;
    res.json({ name: `${first} ${last}` });
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