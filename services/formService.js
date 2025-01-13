const db = require("./db");

const formService = {
  getForms: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM contact_forms", (err, results) => {
        if (err) {
          console.error("Error fetching forms:", err);
          reject(err);
        }
        resolve(results);
      });
    });
  },

  getFormById: (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM contact_forms WHERE id = ?", [id], (err, results) => {
        if (err) {
          console.error(`Error fetching form #${id}:`, err);
          reject(err);
        }
        resolve(results);
      });
    });
  },
};

module.exports = formService;
