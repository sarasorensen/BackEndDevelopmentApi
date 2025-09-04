require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

// --- Connect to MongoDB ---
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

mongoose.connection.on("connected", () => console.log("Mongoose connected!"));
mongoose.connection.on("error", (err) => console.error("Mongoose connection error:", err));

// --- Define Person model ---
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

const Person = mongoose.models.Person || mongoose.model("Person", personSchema);

// --- Mongoose Challenge Functions ---

const createAndSavePerson = (done) => {
  const p = new Person({ name: "John Doe", age: 25, favoriteFoods: ["pizza"] });
  p.save((err, data) => done(err, data));
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => done(err, data));
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => done(err, data));
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => done(err, data));
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => done(err, data));
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updated) => done(err, updated));
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, data) => done(err, data));
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => done(err, data));
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({ name: nameToRemove }, (err, data) => done(err, data));
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ name: 1, favoriteFoods: 1 })
    .exec((err, data) => done(err, data));
};

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
