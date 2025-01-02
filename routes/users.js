import express from "express";
import dbService from "../services/dbService";

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const users = await dbService.getUsers();
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;