require("dotenv").config();

const config = {
  port: process.env.PORT || "4000",
  domain: process.env.DOMAIN || "myapp.local",
  subDomain: process.env.SUB_DOMAIN || "back",
  mongoDbDocker: process.env.MONGO_DOCKER || "mongo:27017",
  mongoDbName: process.env.MONGO_DB_NAME || "portfolio",
  jwtSecret: process.env.JWT_SECRET || "jwt-token-secret-key",
  publicFolder: process.env.PUBLIC_FOLDER || "public",
};

module.exports = config;
