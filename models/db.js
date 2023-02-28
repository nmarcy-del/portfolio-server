const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const uri = process.env.MONGO_DB_URI;

mongoose.set("strictQuery", false); // prepare the future change on mongoose

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

module.exports = mongoose.connection;
