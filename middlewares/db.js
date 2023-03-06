const mongoose = require("mongoose");
const path = require("path");
const config = require("../config");
const domain = config.domain;
const subDomain = config.subDomain;
const dbName = config.mongoDbName;
const mongoDbUri = `mongodb://${subDomain}.${domain}/${dbName}`;

mongoose.set("strictQuery", false); // prepare the future change on mongoose

mongoose
  .connect(mongoDbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

module.exports = mongoose.connection;
