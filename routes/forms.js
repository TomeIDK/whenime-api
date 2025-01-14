const express = require("express");
const formService = require("../services/formService");
const validationService = require("../services/validationService");

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

router.post("/", async (req, res) => {
  // Model Input
  //   "name": "Huge problem",
  //   "email": "test@test.com",
  //   "subject": "There is a huge problem",
  //   "message": "Haha jk, everything is fine there is no problem gotcha."
  const validationErrors = validationService.validateForm(req.body, true);

  if (validationErrors) {
    console.error("Bad request:", validationErrors);
    res.status(400).json({ error: "Bad request:", validationErrors });
  } else {
    try {
      const response = await formService.addForm(req.body);
      res.json(`${response.message} with ID ${response.id}`);
    } catch (err) {
      console.error(`'/forms' - Error adding form:`, err);
      res.status(500).json(`Failed to add form`);
    }
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const validationErrors = validationService.validateForm(req.body, false);

  if (validationErrors) {
    console.error("Bad request:", validationErrors);
    res.status(400).json({ error: "Bad request:", validationErrors });
  } else {
    try {
      const response = await formService.updateForm(req.body, id);
      res.json(`${response.message}. Affected rows: ${response.affectedRows}`);
    } catch (err) {
      console.error(`'/forms' - Error updating form:`, err);
      res.status(500).json(`Failed to update form`);
    }
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await formService.deleteForm(id);
    res.json(`${response.message}. Affected rows: ${response.affectedRows}`);
  } catch (err) {
    console.error(`'/forms' - Error deleting form #${id}:`, err);
    res.status(500).json(`Failed to delete form #${id}`);
  }
});

module.exports = router;
