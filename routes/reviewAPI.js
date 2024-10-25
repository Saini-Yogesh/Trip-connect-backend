const express = require("express");
const router = express.Router();
const Review = require("../models/review");

router.post("/api/review", async (req, res) => {
  const { name, email, phone, company, review } = req.body;

  if (!name || !email || !company || !phone || !review) {
    return res.status(400).send({ error: "All fields are required." });
  }
  if (name.length < 2) {
    return res.status(400).send({ error: "Please enter a valid name." });
  }
  if (company.length < 2) {
    return res.status(400).send({ error: "Please enter a valid company." });
  }
  if (review.length < 10 || review.length > 500) {
    return res.status(400).send({ error: "Review must be 10-500 characters." });
  }
  const emailRegex = /.+@.+\..+/;
  if (!emailRegex.test(email)) {
    return res.status(400).send({ error: "Please enter a valid email." });
  }
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).send({ error: "Invalid phone number." });
  }

  const reviewData = Review({ name, email, phone, company, review });
  try {
    await reviewData.save();
    return res.send({ success: true });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).send("Error saving review: invalid data.");
    } else {
      return res.status(500).send("Internal server error.");
    }
  }
});

module.exports = router;
