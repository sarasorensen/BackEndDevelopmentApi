require("dotenv").config();
const mongoose = require("mongoose");

// Build the URI from Railway variables
const MONGO_URI = `mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@${process.env.MONGOHOST}/sample_mflix?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

// Export model
exports.PersonModel = Person;
