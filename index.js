import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from "./routes/users";

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Mount routes
app.use("/users", usersRoutes);


// Default route
app.get('/', (req, res) => {
    res.send('Whenime API');
});


// Start server
app.listen(port, () => {
    console.log(`Server started on ${port}`);
    
})