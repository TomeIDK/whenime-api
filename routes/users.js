const express = require("express");
const userService = require("../services/userService");
const validationService = require("../services/validationService");

const router = express.Router();

router.get("/", async (req, res) => {
  const searchQuery = req.query.search;
  const limit = parseInt(req.query.limit, 10);
  const offset = parseInt(req.query.offset, 10);
  try {
    const users = await userService.getUsers(searchQuery, limit, offset);
    res.json(users);
  } catch (err) {
    console.error("'/users' - Error fetching users:", err);
    res.status(500).json("Failed to fetch users");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const users = await userService.getUserById(id);
    res.json(users);
  } catch (err) {
    console.error(`'/users' - Error fetching user #${id}:`, err);
    res.status(500).json(`Failed to fetch user #${id}`);
  }
});

router.post("/", async (req, res) => {
  // Model Input
  //   "username": "api",
  //   "email": "test@example.com",
  //   "password": "Pass123",
  //   "dateOfBirth": "1990-01-01",
  //   "profilePicture": "pfp.jpg",
  //   "about": "This is a short bio.",
  //   "isAdmin": 0,
  const validationErrors = await validationService.validateUser(req.body, true);

  if (validationErrors) {
    console.error("Bad request:", validationErrors);
    res.status(400).json({ error: "Bad request:", validationErrors });
  } else {
    try {
      const response = await userService.addUser(req.body);
      res.json(`${response.message} with ID ${response.id}`);
    } catch (err) {
      console.error("'/users' - Error adding user:", err);
      res.status(500).json("Failed to add user");
    }
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const validationErrors = await validationService.validateUser(req.body, false);

  if (validationErrors) {
    console.error("Bad request:", validationErrors);
    res.status(400).json({ error: "Bad request:", validationErrors });
  } else {
    try {
      const response = await userService.updateUser(req.body, id);
      res.json(`${response.message}. Affected rows: ${response.affectedRows}`);
    } catch (err) {
      console.error(`'/users' - Error updating user #${id}:`, err);
      res.status(500).json(`Failed to update user #${id}`);
    }
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await userService.deleteUser(id);
      res.json(`${response.message}. Affected rows: ${response.affectedRows}`);
  } catch (err) {
    console.error(`'/users' - Error deleting user #${id}:`, err);
    res.status(500).json(`Failed to delete user #${id}`);
  }
});

module.exports = router;
