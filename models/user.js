const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "non-binary-other"],
    trim: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
});

// Exclude password when converting to JSON
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password; // Remove password from the returned object
    return ret;
  },
});

module.exports = mongoose.model("User", userSchema);
