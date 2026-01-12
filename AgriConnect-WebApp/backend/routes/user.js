import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

// Get current user profile
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    // Normalize roles / role for backward compatibility
    const rolesArr = Array.isArray(user.roles)
      ? user.roles
      : user.role
      ? [user.role]
      : ["farmer", "buyer"];
    const role = (rolesArr && rolesArr[0]) || "farmer";
    const out = user.toObject();
    out.roles = rolesArr;
    out.role = role;
    res.json(out);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
