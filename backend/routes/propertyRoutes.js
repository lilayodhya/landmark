import express from "express";

import {
    getProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty
} from "../controllers/propertyController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getProperties);
router.get("/:id", getPropertyById);

// Admin Only Routes
router.post("/", verifyToken, isAdmin, createProperty);
router.put("/:id", verifyToken, isAdmin, updateProperty);
router.delete("/:id", verifyToken, isAdmin, deleteProperty);

export default router;