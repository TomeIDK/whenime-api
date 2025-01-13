const express = require("express");
const formService = require("../services/formService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const forms = await formService.getForms();
    res.json(forms);
  } catch (err) {
    console.error(`'/forms' - Error fetching forms:`, err);
    res.status(500).json(`Failed to fetch forms`);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const forms = await formService.getFormById(id);
    res.json(forms);
  } catch (err) {
    console.error(`'/forms' - Error fetching form #${id}:`, err);
    res.status(500).json(`Failed to fetch form #${id}`);
  }
});

module.exports = router;
