const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator"); // For input validation
const mongoose = require("mongoose");

// helper fcn
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h", //  Set an appropriate expiration time
  });
};

exports.registerUser = async (req, res) => {
  // Input validation (using express-validator, see routes below)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // existance checking
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // new user creation
    const newUser = new User({
      name,
      email,
      password,
    });

    const savedUser = await newUser.save();

    const token = generateToken(savedUser._id);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", details: error.message });
  }
};
