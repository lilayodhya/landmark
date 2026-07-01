import express from "express";

import {
    register,
    login,
    getUsers
} from "../controllers/authController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Admin Only Route
router.get("/users", verifyToken, isAdmin, getUsers);

export default router;