const program = require("commander");
const AdminUser = require("../models/adminUsers");
const connection = require("../middlewares/db");

// Configure commander.js
program.version("1.0.0").description("CLI tool to create a new user");

program
  .command("showUsers [username]")
  .description("List all users or show a specific user")
  .action(async (username) => {
    try {
      // Connect to the database
      await connection;

      // Avoid prompt and db connexion message collapses
      await new Promise((resolve) => setTimeout(resolve, 100));

      let users;

      // If a username is specified, get the user with that username
      if (username) {
        users = await AdminUser.find({ username });
      } else {
        // Otherwise, get all users
        users = await AdminUser.find({});
      }

      // Print the list of users
      console.log("=======================");
      console.log("Admin users:");
      console.log("-----------------------");
      users.forEach((user) => {
        console.log(
          `- ${user.username}${user.canEdit ? " (Editor)" : " (Demo)"}`
        );
      });
      console.log("=======================");
    } catch (err) {
      console.error("An error occurred..");
    } finally {
      // Disconnect from the database
      connection.close();
    }
  });

// Parse the command line arguments and execute the appropriate command
program.parse(process.argv);
