// myApp.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// ==========================
// MongoDB Connection (optional for FCC Mongoose exercises)
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on('connected', () => console.log('MongoDB connected'));
  mongoose.connection.on('error', err => console.log('MongoDB connection error:', err));
}

// ==========================
// Middleware
// Logging middleware (root-level)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// ==========================
// Routes

// Root HTML
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// JSON route
app.get('/json', (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message });
});

// Time server: chain middleware
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({ time: req.time });
});

// Echo route
app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word });
});

// /name route: GET & POST
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

// ==========================
// Export app for FCC testing
module.exports = app;
