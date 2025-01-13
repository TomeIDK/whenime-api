const db = require("./db");

const newsService = {
  getNews: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM news", (err, results) => {
        if (err) {
          console.error(`Error fetching news:`, err);
          reject(err);
        }
        resolve(results);
      });
    });
  },

  getNewsById: (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM news WHERE id = ?", [id], (err, results) => {
        if (err) {
          console.error(`Error fetching news #${id}:`, err);
          reject(err);
        }
        resolve(results);
      });
    });
  },
};

module.exports = newsService;
