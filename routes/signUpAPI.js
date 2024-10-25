const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { models } = require("mongoose");

router.post("/api/user/signUp", async (req, res) => {
  const { email, password, name, dob, gender, username } = req.body;
  if (
    (gender != "male" && gender != "female" && gender != "non-binary-other") ||
    !name ||
    !gender ||
    !password ||
    !dob ||
    !username
  ) {
    return res.status(400).send({
      success: false,
      result: "Invalid credentials",
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .send({ success: false, result: "User already exists" });
    }
    const user = new User({ email, password, name, dob, gender, username });
    await user.save();
    res.send({ success: true, token: email });
  } catch {
    res.status(500).send({ success: false, result: "Internal server error" });
  }
});

module.exports = router;
