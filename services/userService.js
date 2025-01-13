const db = require("./db");

const userService = {
  getUsers: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users", (err, results) => {
        if (err) {
          console.error("Error fetching users:", err);
          reject(err);
        }
        resolve(results);
      });
    });
  },

  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
        if (err) {
          console.error("Error fetching users:", err);
          reject(err);
        }
        resolve(results);
      });
    });
  },
};

module.exports = userService;
