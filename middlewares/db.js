const mongoose = require("mongoose");
const config = require("../config/config");
const mongoDbDocker = config.mongoDbDocker;
const dbName = config.mongoDbName;
const mongoDbUri = `mongodb://${mongoDbDocker}/${dbName}`;

mongoose.set("strictQuery", false); // prepare the future change on mongoose

mongoose
  .connect(mongoDbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

module.exports = mongoose.connection;
