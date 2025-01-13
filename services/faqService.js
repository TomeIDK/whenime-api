const db = require("./db");

const faqService = {
  getFaq: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT 
    faq_categories.id AS category_id,
    faq_categories.name AS category_name,
    faq_categories.created_at AS category_created_at,
    faq_categories.updated_at AS category_updated_at,
    faq_questions.id AS question_id,
    faq_questions.question,
    faq_questions.answer,
    faq_questions.created_at AS question_created_at,
    faq_questions.updated_at AS question_updated_at
    FROM faq_categories
    LEFT JOIN faq_questions 
    ON faq_categories.id = faq_questions.faq_category_id
    ORDER BY faq_categories.id, faq_questions.id
    `;
      db.query(query, (err, results) => {
        if (err) {
          console.error("Error fetching faq:", err);
          reject(err);
        }
        resolve(results);
      });
    });
  },

  getFaqCategories: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM faq_categories`;
      db.query(query, (err, results) => {
        if (err) {
          console.error("Error fetching faq categories:", err);
          reject(err);
        }
        resolve(results);
      });
    });
  },

  getFaqCategoryById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM faq_categories WHERE id = ?`;
      db.query(query, [id], (err, results) => {
        if (err) {
          console.error(`Error fetching faq category #${id}:`, err);
          reject(err);
        }
        resolve(results);
      });
    });
  },

  getFaqQuestions: () => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM faq_questions`;
      db.query(query, (err, results) => {
        if (err) {
          console.error("Error fetching faq questions:", err);
          reject(err);
        }
        resolve(results);
      });
    });
  },

  getFaqQuestionById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM faq_questions WHERE id = ?`;
      db.query(query, [id], (err, results) => {
        if (err) {
          console.error(`Error fetching faq question #${id}:`, err);
          reject(err);
        }
        resolve(results);
      });
    });
  },
};

module.exports = faqService;
