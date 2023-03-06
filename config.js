require("dotenv").config();

const config = {
  port: process.env.PORT || "4000",
  domain: process.env.DOMAIN || "myapp.local",
  subDomain: process.env.SUB_DOMAIN || "back",
  mongoDbName: process.env.MONGO_DB_NAME || "portfolio",
  jwtSecret: process.env.JWT_SECRET || "jwt-token-secret-key",
  csrfSecret: process.env.CSRF_SECRET || "csrf-secret123456789745455757757",
  cookieParserSecret:
    process.env.COOKIE_PARSER_SECRET || "cookie-parser-secret",
};

module.exports = config;
