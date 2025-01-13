const db = require("./db");
const bcrypt = require("bcrypt");

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

  addUser: (user) => {
    const {
      username,
      email,
      password,
      dateOfBirth = null,
      profilePicture = null,
      about = null,
      isAdmin = 0,
    } = user;

    let finalProfilePicture = null;
    if (profilePicture) {
      finalProfilePicture = "profile_pictures/" + profilePicture;
    }
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error("Error hashing password:", err);
          reject(err);
        }
        db.query(
          `INSERT INTO users (username, email, password, date_of_birth, profile_picture, about, is_admin, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [
            username,
            email,
            hashedPassword,
            dateOfBirth,
            finalProfilePicture,
            about,
            isAdmin,
          ],
          (err, results) => {
            if (err) {
              console.error("Error adding user:", err);
              reject(err);
            }
            resolve("User added successfully.");
          }
        );
      });
    });
  },

  updateUser: (user, id) => {
    const {
      username,
      email,
      password,
      dateOfBirth,
      profilePicture,
      about,
      isAdmin,
    } = user;

    return new Promise(async (resolve, reject) => {
      let hashedPassword = password;

      const hashPasswordPromise = new Promise((resolveHash, rejectHash) => {
        if (password) {
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              console.error("Error hashing password:", err);
              return rejectHash(err);
            }
            resolveHash(hash);
          });
        } else {
          resolveHash(null);
        }
      });

      hashPasswordPromise
        .then((finalHashedPassword) => {
          hashedPassword = finalHashedPassword;

          db.query(
            `UPDATE users
            SET
            username = COALESCE(?, username),
            email = COALESCE(?, email),
            password = COALESCE(?, password),
            date_of_birth = COALESCE(?, date_of_birth),
            profile_picture = COALESCE(?, profile_picture),
            about = COALESCE(?, about),
            is_admin = COALESCE(?, is_admin),
            updated_at = NOW()
            WHERE id = ?`,
            [
              username || null,
              email || null,
              hashedPassword || null,
              dateOfBirth || null,
              profilePicture ? "profile_pictures/" + profilePicture : null,
              about || null,
              isAdmin || null,
              id,
            ],
            (err, results) => {
              if (err) {
                console.error("Error updating user:", err);
                reject(err);
              }
              resolve("User updated successfully.");
            }
          );
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM users WHERE id = ?", [id], (err, results) => {
        if (err) {
          console.error(`Error deleting user #${id}:`, err);
          reject(err);
        }
        resolve("User deleted successfully");
      });
    });
  },
};

module.exports = userService;
