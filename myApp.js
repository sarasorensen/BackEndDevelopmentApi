require('dotenv').config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

mongoose.connection.on("connected", () => console.log("Mongoose connected!"));
mongoose.connection.on("error", (err) => console.error("Mongoose connection error:", err));

// --- Define Person model ---
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});
let Person = mongoose.models.Person || mongoose.model("Person", personSchema);

// Export it
exports.PersonModel = Person;
