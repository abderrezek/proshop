import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

import User from "../models/user";
import { generateToken } from "../utils/token";

// @desc    Create User
// @route   Post /
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    return res.json({ message: "User already exists." });
  }
  console.log(userExists);

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    return res.json({ message: "Invalid user data." });
  }
});

// @desc    Auth user & get token
// @route   POST /login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  await User.findOne({ email }, (err, user) => {
    if (err) {
      console.log("login", err);
      return done({ message: "Somthing Wrong happen." }, false);
    }

    res.setHeader("Content-Type", "text/json");

    // Verifier if user exist
    if (!user) {
      res.status(404);
      return res.json({ message: "User not exist." });
    }

    // Verifier if user mastch password
    if (!user._authenticateUser(password)) {
      res.status(401);
      return res.json({ message: "Invalid email or password" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  });
});

// @desc    Profile User
// @route   GET /profile
// @access  Private
export const profile = asyncHandler(async (req, res) => {
  await User.findById(req.user._id, (err, user) => {
    if (err) {
      console.log("login", err);
      return done({ message: "Somthing Wrong happen." }, false);
    }

    res.setHeader("Content-Type", "text/json");

    // Verifier if user exist
    if (!user) {
      res.status(404);
      return res.json({ message: "User not exist." });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  });
});

// @desc    Update user profile
// @route   PUT /profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.setHeader("Content-Type", "text/json");

  // Verifier if user exist
  if (!user) {
    res.status(404);
    return res.json({ message: "User not exist." });
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: generateToken(updatedUser._id),
  });
});
