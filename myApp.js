require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected!");
});
mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

// --- Only start Express server if this file is run directly ---
if (require.main === module) {
  app.get("/", (req, res) => {
    res.send("Hello! MongoDB is connected and your app is running.");
  });

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

// --- Mongoose Challenge Functions ---
let Person;

const createAndSavePerson = (done) => { done(null); };
const createManyPeople = (arrayOfPeople, done) => { done(null); };
const findPeopleByName = (personName, done) => { done(null); };
const findOneByFood = (food, done) => { done(null); };
const findPersonById = (personId, done) => { done(null); };
const findEditThenSave = (personId, done) => { done(null); };
const findAndUpdate = (personName, done) => { done(null); };
const removeById = (personId, done) => { done(null); };
const removeManyPeople = (done) => { done(null); };
const queryChain = (done) => { done(null); };

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
*/

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
