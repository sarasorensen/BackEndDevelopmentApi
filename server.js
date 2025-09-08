/********************************************
 * RAILWAY-READY SERVER.JS
 *********************************************/

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const router = express.Router();
const TIMEOUT = 10000; // safety timeout for callbacks

// --- Express Middleware ---
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

const enableCORS = (req, res, next) => {
  if (!process.env.DISABLE_XORIGIN) {
    const allowedOrigins = ["https://www.freecodecamp.org"];
    const origin = req.headers.origin;
    if (!process.env.XORIGIN_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
      res.set({
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      });
    }
  }
  next();
};

// --- Simple health check for Railway ---
app.get("/", (req, res) => res.send("Server is running"));

// --- Router file serving ---
router.get("/file/*?", (req, res, next) => {
  if (req.params[0] === ".env") return next({ status: 401, message: "ACCESS DENIED" });
  fs.readFile(path.join(__dirname, req.params[0]), (err, data) => {
    if (err) return next(err);
    res.type("txt").send(data.toString());
  });
});

// --- Mongoose Setup ---
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

mongoose.connection.on("connected", () => console.log("Mongoose connected!"));
mongoose.connection.on("error", (err) => console.error("Mongoose connection error:", err));

// --- Import model and challenge functions ---
const Person = require("./myApp.js").PersonModel;
const {
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain
} = require("./myApp.js");

// --- Helper to wrap routes with timeout safety ---
function withTimeout(fn) {
  return (req, res, next) => {
    const t = setTimeout(() => next({ message: "timeout" }), TIMEOUT);
    fn(req, res, (err, data) => {
      clearTimeout(t);
      if (err) return next(err);
      res.json(data || {});
    });
  };
}

// --- API routes using challenge functions ---
router.get("/create-and-save-person", withTimeout(createAndSavePerson));
router.post("/create-many-people", withTimeout(createManyPeople));
router.post("/find-all-by-name", withTimeout(findPeopleByName));
router.post("/find-one-by-food", withTimeout(findOneByFood));
router.get("/find-by-id", withTimeout(findPersonById));
router.post("/find-edit-save", withTimeout(findEditThenSave));
router.post("/find-one-update", withTimeout(findAndUpdate));
router.post("/remove-one-person", withTimeout(removeById));
router.post("/remove-many-people", withTimeout(removeManyPeople));
router.post("/query-tools", withTimeout(queryChain));

app.use("/_api", enableCORS, router);

// --- Error handling ---
app.use((err, req, res, next) => {
  if (err) {
    res.status(err.status || 500).type("txt").send(err.message || "SERVER ERROR");
  }
});

// --- 404 handler ---
app.use((req, res) => {
  res.status(404).type("txt").send("Not Found");
});

// --- Listen immediately, Railway-ready ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Your app is listening on port ${PORT}`));
