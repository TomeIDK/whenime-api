const express = require("express");
const faqService = require("../services/faqService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const faq = await faqService.getFaq();
    res.json(faq);
  } catch (err) {
    console.error("'/faq' - Error fetching faq:", err);
    res.status(500).json("Failed to fetch faq");
  }
});

router.get("/categories", async (req, res) => {
  try {
    const faq = await faqService.getFaqCategories();
    res.json(faq);
  } catch (err) {
    console.error("'/faq' - Error fetching faq categories:", err);
    res.status(500).json("Failed to fetch faq categories");
  }
});

router.get("/categories/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const faq = await faqService.getFaqCategoryById(id);
    res.json(faq);
  } catch (err) {
    console.error(`'/faq' - Error fetching faq category #${id}:`, err);
    res.status(500).json(`Failed to fetch faq category #${id}`);
  }
});

router.get("/questions", async (req, res) => {
  try {
    const faq = await faqService.getFaqQuestions();
    res.json(faq);
  } catch (err) {
    console.error("'/faq' - Error fetching faq questions:", err);
    res.status(500).json("Failed to fetch faq questions");
  }
});

router.get("/questions/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const faq = await faqService.getFaqQuestionById(id);
    res.json(faq);
  } catch (err) {
    console.error(`'/faq' - Error fetching faq question #${id}:`, err);
    res.status(500).json(`Failed to fetch faq question #${id}`);
  }
});

module.exports = router;
