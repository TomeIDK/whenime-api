# Whenime API
This API works on Whenime's database. In order to set up a local version of it, please follow the installation guide in [Whenime](https://github.com/TomeIDK/whenime)'s repository.  
It is recommended to use Postman to access the routes. If you don't have Postman yet, you can install the VSCode extension or download the client [here](https://www.postman.com/downloads/).  
# Installation
1. Clone the project to a directory of your choosing.
2. Open a terminal and cd to the root of the project.
3. Use the `npm install` command and wait for it to finish.
4. Copy the `.env.example` and rename it to `.env`.
5. Enter all necessary database credentials. Normally using the same ones as in the main Whenime repository should be sufficient.  
   **Do not copy Whenime's .env! Only the necessary values should be added to their corresponding fields in the API's .env!**
6. Verify your setup by using `node index.js` in your terminal. If everything is done correctly you should see the following messages:  
  
   ![Server started on http://127.0.0.1:3000 Connected to the database.](https://i.gyazo.com/3c079e6dd744809bf4ee4d3eef3b0f20.png)
8. Click the link that pops up in the terminal to view the API documentation.
9. Congratulations, you have successfully installed the API!
