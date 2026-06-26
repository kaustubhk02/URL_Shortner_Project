const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');

const URL = require('./models/urlModel');
const { connectMongoDB } = require("./connectDB");
const urlRoute = require("./routes/urlRoute");
const staticURL = require("./routes/staticRoute");
const userRoute = require("./routes/userRoute");
const {restrictLoggedInUser, checkAuth} = require('./middlewares/authCookies');
// const {restrictLoggedInUser, checkAuth} = require('./middlewares/authHeaders');

const app = express();
const PORT = 1500;

connectMongoDB("mongodb://127.0.0.1:27017/shortUrlDB")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(() => {
    console.log("ERROR in MongoDB Connection");
  });

app.set("view engine", "ejs"); // this tells the server thatt which templating engine we are using.
app.set("views", path.resolve('./views'));  // this tells the server that all views are present at the path provided.


app.use(express.json()); // When a user sends JSON data to your server, express.json() converts it into a JavaScript object so you can use it through req.body. 
app.use(express.urlencoded({extended:false})); // when sent data is 'form-data'
app.use(cookieParser()); 


app.use("/url", restrictLoggedInUser, urlRoute);
// Middleware --> 'restrictLoggedInUser' is added in between for authentication (cookie-check for logged-in user)
// (e.g., by verifying a session cookie or JWT) before allowing access to urlRoute.
app.use("/", checkAuth, staticURL);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server Started at port ${PORT}`);
});