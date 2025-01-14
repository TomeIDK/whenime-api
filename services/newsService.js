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

  addNews: (news) => {
    const { title, image, content } = news;
    let finalImage = "news_images/" + image;
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO news (title, image, content, created_at, updated_at)
          VALUES (?, ?, ?, NOW(), NOW())`,
        [title, finalImage, content],
        (err, results) => {
          if (err) {
            console.error(`Error adding news:`, err);
            reject(err);
          } else {
            resolve({
              message: "News added successfully",
              id: results.insertId,
            });
          }
        }
      );
    });
  },

  updateNews: (news, id) => {
    const { title, image, content } = news;
    let finalImage = image;
    if (image) {
      finalImage = "news_images/" + image;
    }
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE news
        SET
        title = COALESCE(?, title),
        image = COALESCE(?, image),
        content = COALESCE(?, content),
        updated_at = NOW()
        WHERE id = ?`,
        [title || null, finalImage || null, content || null, id],
        (err, results) => {
          if (err) {
            console.error(`Error updating news:`, err);
            reject(err);
          } else {
            if (results.affectedRows > 0) {
              resolve({
                message: "News updated successfully",
                affectedRows: results.affectedRows,
              });
            } else {
              resolve({
                message: "No changes were made",
                affectedRows: 0,
              });
            }
          }
        }
      );
    });
  },

  deleteNews: (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM news WHERE id = ?", [id], (err, results) => {
        if (err) {
          console.error(`Error deleting news #${id}:`, err);
          reject(err);
        } else {
          if (results.affectedRows > 0) {
            resolve({
              message: "News deleted successfully",
              affectedRows: results.affectedRows,
            });
          } else {
            resolve({
              message: "No changes were made",
              affectedRows: 0,
            });
          }
        }
      });
    });
  },
};

module.exports = newsService;
