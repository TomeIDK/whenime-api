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
      db.query(
        "SELECT * FROM contact_forms WHERE id = ?",
        [id],
        (err, results) => {
          if (err) {
            console.error(`Error fetching form #${id}:`, err);
            reject(err);
          }
          resolve(results);
        }
      );
    });
  },

  addForm: (form) => {
    const { name, email, subject, message } = form;
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO contact_forms (name, email, subject, message, status, created_at, updated_at)
          VALUES (?, ?, ?, ?, 'UNREAD', NOW(), NOW())`,
        [name, email, subject, message],
        (err, results) => {
          if (err) {
            console.error(`Error adding form:`, err);
            reject(err);
          } else {
            resolve({
              message: "Form added successfully",
              id: results.insertId,
            });
          }
        }
      );
    });
  },

  updateForm: (form, id) => {
    const { name, email, subject, message, status } = form;
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE contact_forms
        SET
        name = COALESCE(?, name),
        email = COALESCE(?, email),
        subject = COALESCE(?, subject),
        message = COALESCE(?, message),
        status = COALESCE(?, status),
        updated_at = NOW()
        WHERE id = ?`,
        [
          name || null,
          email || null,
          subject || null,
          message || null,
          status || null,
          id,
        ],
        (err, results) => {
          if (err) {
            console.error(`Error updating form:`, err);
            reject(err);
          } else {
            if (results.affectedRows > 0) {
              resolve({
                message: "Form updated successfully",
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

  deleteForm: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM contact_forms WHERE id = ?",
        [id],
        (err, results) => {
          if (err) {
            console.error(`Error deleting form #${id}:`, err);
            reject(err);
          } else {
            if (results.affectedRows > 0) {
              resolve({
                message: "Form deleted successfully",
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
};

module.exports = formService;
