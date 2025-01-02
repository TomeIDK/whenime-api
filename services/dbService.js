require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "",
  user: "",
  password: "",
  database: "whenime",
});

const dbService = {
  getUsers: async () => {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  },
};

module.exports = dbService;
