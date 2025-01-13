const express = require("express");
const userService = require("../services/userService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await userService.getUsers();
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

module.exports = router;
