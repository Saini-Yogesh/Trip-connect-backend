const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/api/user/signIn", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      success: false,
      result: "Invalid credentials",
    });
  }
  try {
    let user = await User.findOne({ email, password });
    if (!user)
      return res.send({ success: false, result: "User doesn't exist" });
    res.send({ success: true, token: email });
  } catch {
    res.send({ success: false, result: "Some error occurred in finding user" });
  }
});

module.exports = router;
