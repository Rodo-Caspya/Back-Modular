const mongoose = require("mongoose");
const db = "mongodb+srv://Usuario:Juan-12345@modular.ixehi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//const db = process.env.DB_URI;

async function connectDB() {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
