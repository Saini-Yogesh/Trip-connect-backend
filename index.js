const mongoose = require("mongoose");
const express = require("express");
const app = express();

const User = require("./models/user");
const signInAPI = require("./routes/signInAPI");
const signUpAPI = require("./routes/signUpAPI");
const checkEmailAPI = require("./routes/chekEmailAPI");
const reviewAPI = require("./routes/reviewAPI");
// const connectWithDb = require("./dbConnection");

/*
CORS Policy: If your frontend and backend are hosted on different ports 
(e.g., frontend on localhost:3000 and backend on localhost:5000),
you might encounter Cross-Origin Resource Sharing (CORS) issues.
The backend must include CORS headers to allow requests from the frontend.

To enable CORS in Express, you can use the cors middleware:
 */
const cors = require("cors");
app.use(cors());

// parses incoming request bodies that are in JSON format
app.use(express.json());

const port = 5000;

// database connectivity
(async () => {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/trip-connect")
    .then(() => {
      console.log("Connected with DB");
    })
    .catch((err) => {
      console.log("Error connecting to DB: ", err);
    });
})();

// Start the server
app.listen(port, () => {
  console.log(`listining at http://localhost:${port}/`);
});

// signIn user
app.post("/api/user/signIn", signInAPI);

// check email is unique or not
app.post("/api/user/check-email", checkEmailAPI);

// signUp user
app.post("/api/user/signUp", signUpAPI);

// review
app.post("/api/review", reviewAPI);

// for catch all route
app.use((req, res) => {
  res.status(404).send({ success: false, result: "Unauthorized route" });
});
