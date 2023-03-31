const cors = require("cors");
const config = require("../config/config");
const domain = config.domain.replace(/\./g, "\\.");
const corsWhitelist = [`^https?:\\/\\/.*\\.${domain}(:\\d+)?\\/?$`];

const corsOptions = {
  credentials: true,
  allowedMethod: "GET,HEAD,PUT,PATCH,POST,DELETE",
  origin: function (origin, callback) {
    if (corsWhitelist.some((regexStr) => new RegExp(regexStr).test(origin))) {
      callback(null, true);
    } else if (!origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

module.exports = cors(corsOptions);
