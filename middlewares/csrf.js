const csrf = require("tiny-csrf");
const cookieParser = require("cookie-parser");

const csrfSecret =
  process.env.CSRF_SECRET || "csrf-secret123456789745455757757";

const cookieParserSecret =
  process.env.COOKIE_PARSER_SECRET || "cookie-parser-secret";

const protectedMethods = ["PUT", "PATCH", "POST", "DELETE"];

const cookieParserMiddleware = cookieParser(cookieParserSecret);

const csrfProtection = csrf(csrfSecret, protectedMethods, [/\/auth\.*/i]);

module.exports = { cookieParserMiddleware, csrfProtection };
