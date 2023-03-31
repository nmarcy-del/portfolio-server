require("./middlewares/db");
const config = require("./config/config");
const fs = require("fs");
const https = require("https");
const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("./middlewares/passport");
const corsMiddleware = require("./middlewares/cors");
const { csrfMiddleware, verifyCsrfMiddleware } = require("./middlewares/csrf");

const port = config.port;
const app = express();
app.use(cookieParser());

// Allow cross-origin requests

app.use(corsMiddleware);

// Read ssl certificate and private key

const privateKey = fs.readFileSync("./certs/myapp.local.key", "utf8");
const certificate = fs.readFileSync("./certs/myapp.local.crt", "utf8");

// Create https server instance with private key and certificate

const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);

// Define http response on root

app.get("/", (req, res) => {
  res.send("Server is running..");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize passport

app.use(passport.initialize());

// Set authentication routes

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

// csrf generate

const csrf = require("./routes/csrfRoutes");
app.use(
  "/csrf",
  passport.authenticate("jwt", { session: false }),
  csrfMiddleware,
  verifyCsrfMiddleware,
  csrf
);

// List of api routes for the app

const worksRoutes = require("./routes/worksRoutes");
const skillsRoutes = require("./routes/skillsRoutes");
const toolsRoutes = require("./routes/toolsRoutes");
const contactInformationsRoutes = require("./routes/contactInformationsRoutes");
const cmsBlockRoutes = require("./routes/cmsBlockRoutes");
const cvRoutes = require("./routes/cvRoutes");

// Protected routes
app.use(
  "/api",
  passport.authenticate("jwt", { session: false }),
  csrfMiddleware,
  verifyCsrfMiddleware,
  csrf,
  worksRoutes,
  skillsRoutes,
  toolsRoutes,
  contactInformationsRoutes,
  cmsBlockRoutes,
  cvRoutes
);

// Start server
httpsServer.listen(port, () => {
  console.log(`HTTPS server is running on port ${port}`);
});
