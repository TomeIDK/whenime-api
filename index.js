const express = require('express');
const bodyParser = require('body-parser');
const db = require('./services/db');
const path = require('path');

const usersRoutes = require('./routes/users');
const newsRoutes = require('./routes/news');
const faqRoutes = require('./routes/faq');
const formsRoutes = require("./routes/forms");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const ip = process.env.IP_ADDRESS;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Mount routes
app.use("/users", usersRoutes);
app.use("/news", newsRoutes);
app.use("/faq", faqRoutes);
app.use("/forms", formsRoutes);


// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


// Start server
const server = app.listen(port, () => {
    console.log(`Server started on http://${ip}:${port}`);
});

// Handle shutdown
const shutdown = () => {
    console.log("\nShutting down...");
    db.end((err) => {
        if (err) console.error("Error closing MySQL connection:", err);
        else console.log("MySQL connection closed.");
        server.close(() => {
            console.log("Server closed.");
            process.exit(0);
        });
    });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);