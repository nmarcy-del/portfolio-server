const cors = require("cors");
const corsWhitelist = process.env.CORS_WHITELIST
  ? [process.env.CORS_WHITELIST]
  : ["^https?://.*.myapp.local(:d+)?/?$"];

const corsOptions = {
  credentials: true,
  allowedMethod: "GET,HEAD,PUT,PATCH,POST,DELETE",
  origin: function (origin, callback) {
    if (corsWhitelist.some((regexStr) => new RegExp(regexStr).test(origin))) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = cors(corsOptions);
