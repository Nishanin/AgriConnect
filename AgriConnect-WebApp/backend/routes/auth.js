import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role, location, phone } = req.body;
    // Check for existing email or username to provide clearer errors
    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ message: "Email already in use" });

    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json({ message: "Username already in use" });
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user with BOTH roles by default so the same account can act as
    // farmer or buyer. The frontend will choose an active role when logging in.
    const user = new User({
      username,
      email,
      password: hashedPassword,
      roles: ["farmer", "buyer"],
      location: location || "Not specified",
      phone: phone || "Not specified",
    });
    await user.save();
    // Immediately log in the user after registration
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        // For backward compatibility the API returns a single `role` field
        // that the frontend uses as the active role. If client sent an
        // explicit role during registration, use it as the active role,
        // otherwise default to the first available role.
        role: role || (user.roles && user.roles[0]) || "farmer",
        roles: user.roles,
        location: user.location,
        phone: user.phone,
      },
    });
  } catch (err) {
    // Handle duplicate-key errors gracefully
    console.error("Registration error:", err);
    if (err && err.code === 11000) {
      // Determine which field caused the duplicate key
      const field = err.keyValue ? Object.keys(err.keyValue)[0] : "field";
      return res.status(400).json({ message: `${field} already exists` });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password, selectedRole } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    // Normalize roles for older user documents that might have a single
    // `role` property instead of `roles` array.
    const rolesArr = Array.isArray(user.roles)
      ? user.roles
      : user.role
      ? [user.role]
      : ["farmer", "buyer"];
    // Decide active role: if client provided a selectedRole on login use it,
    // otherwise default to the first role in the user's roles array.
    const activeRole = selectedRole || (rolesArr && rolesArr[0]) || "farmer";
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: activeRole,
        roles: rolesArr,
        location: user.location,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
