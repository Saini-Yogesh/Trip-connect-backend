const mongoose = require("mongoose");
const express = require("express");
const app = express();
const User = require("./models/user.js");
const users = require("./roughData");

app.use(express.json());
const port = 5000;
app.listen(port, () => {
  console.log(`listining at http://localhost:${port}/`);
});

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

// add many users
app.post("/api/user", async (req, res) => {
  await User.insertMany(users).catch(() => {
    res.status(500).send({ success: false, result: "internal error" });
  });

  res.send({ success: true, result: "Users inserted succesfully" });
});
