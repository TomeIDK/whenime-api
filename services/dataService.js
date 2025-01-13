const db = require("./db");

const dataService = {
  getExistingEmails: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT email FROM users", (err, results) => {
        if (err) {
          console.error("Error fetching emails:", err);
          reject(err);
        }
        resolve(results.map((row) => row.email));
      });
    });
  },

  getExistingUsernames: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT username FROM users", (err, results) => {
        if (err) {
          console.error("Error fetching usernames:", err);
          reject(err);
        }
        resolve(results.map((row) => row.username));
      });
    });
  },
};

module.exports = dataService;
