require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

mongoose.connection.on("connected", () => console.log("Mongoose connected!"));
mongoose.connection.on("error", (err) => console.error("Mongoose connection error:", err));

// Define the Person model
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.models.Person || mongoose.model("Person", personSchema);

// --- Mongoose Challenge Functions ---

// 1. Create and save a single person
const createAndSavePerson = (done) => {
  const john = new Person({ name: "John", age: 30, favoriteFoods: ["pizza"] });
  john.save((err, data) => done(err, data));
};

// 2. Create many people
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => done(err, data));
};

// 3. Find people by name
const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => done(err, data));
};

// 4. Find one person by favorite food
const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => done(err, data));
};

// 5. Find a person by ID
const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => done(err, data));
};

// 6. Find, edit then save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if (err) return done(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => done(err, updatedPerson));
  });
};

// 7. Find and update a person
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedPerson) => {
    done(err, updatedPerson);
  });
};

// 8. Remove by ID
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedPerson) => done(err, removedPerson));
};

// 9. Remove many people
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({ name: nameToRemove }, (err, result) => done(err, result));
};

// 10. Query chain
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ name: 1, favoriteFoods: 1 })
    .exec((err, data) => done(err, data));
};

// ----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------
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
