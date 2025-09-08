require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URL; // <-- USE THIS EXACTLY

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

mongoose.connection.on("connected", () => console.log("Mongoose connected!"));
mongoose.connection.on("error", (err) => console.error("Mongoose connection error:", err));

// Define schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.models.Person || mongoose.model("Person", personSchema);

exports.PersonModel = Person;
