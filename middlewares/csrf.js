const csrf = require("tiny-csrf");
const cookieParser = require("cookie-parser");
const config = require("../config");

const csrfSecret = config.csrfSecret;

const cookieParserSecret = config.cookieParserSecret;

const protectedMethods = ["PUT", "PATCH", "POST", "DELETE"];

const cookieParserMiddleware = cookieParser(cookieParserSecret);

const csrfProtection = csrf(csrfSecret, protectedMethods, [/\/auth\.*/i]);

module.exports = { cookieParserMiddleware, csrfProtection };
