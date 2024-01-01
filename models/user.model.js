const mongoose = require("mongoose");

// User Schema
const UserSchema = mongoose.Schema(
  {
    equipe: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    token: { type: String },
    resetToken: { type: String },
    resetTokenExpiration: { type: Date },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

// User model
const User = mongoose.model("user", UserSchema);

module.exports = User;
