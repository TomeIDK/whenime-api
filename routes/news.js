const express = require("express");
const newsService = require("../services/newsService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const news = await newsService.getNews();
    res.json(news);
  } catch (err) {
    console.error(`'/news' - Error fetching news:`, err);
    res.status(500).json(`Failed to fetch news`);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const news = await newsService.getNewsById(id);
    res.json(news);
  } catch (err) {
    console.error(`'/news' - Error fetching news #${id}:`, err);
    res.status(500).json(`Failed to fetch news #${id}`);
  }
});

module.exports = router;
