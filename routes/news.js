const express = require("express");
const newsService = require("../services/newsService");
const validationService = require("../services/validationService");

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

router.post("/", async (req, res) => {
  // Model Input
  //   "title": "Interesting news piece",
  //   "image": "header.png",
  //   "content": "This is an article that talks about things which are interesting and topical."
  const validationErrors = validationService.validateNews(req.body, true);

  if (validationErrors) {
    console.error("Bad request:", validationErrors);
    res.status(400).json({ error: "Bad request:", validationErrors });
  } else {
    try {
      const response = await newsService.addNews(req.body);
      res.json(`${response.message} with ID ${response.id}`);
    } catch (err) {
      console.error(`'/news' - Error adding news:`, err);
      res.status(500).json(`Failed to add news`);
    }
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const validationErrors = validationService.validateNews(req.body, false);

  if (validationErrors) {
    console.error("Bad request:", validationErrors);
    res.status(400).json({ error: "Bad request:", validationErrors });
  } else {
    try {
      const response = await newsService.updateNews(req.body, id);
      res.json(`${response.message}. Affected rows: ${response.affectedRows}`);
    } catch (err) {
      console.error(`'/news' - Error updating news:`, err);
      res.status(500).json(`Failed to update news`);
    }
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await newsService.deleteNews(id);
      res.json(`${response.message}. Affected rows: ${response.affectedRows}`);
  } catch (err) {
    console.error(`'/news' - Error deleting news:`, err);
    res.status(500).json(`Failed to delete news`);
  }
});

module.exports = router;
