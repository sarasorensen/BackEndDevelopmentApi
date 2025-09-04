require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

mongoose.connection.on("connected", () => console.log("Mongoose connected!"));
mongoose.connection.on("error", (err) => console.error("Mongoose connection error:", err));

// --- Define the Person model ---
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.models.Person || mongoose.model("Person", personSchema);

// --- Mongoose Challenge Functions ---
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
