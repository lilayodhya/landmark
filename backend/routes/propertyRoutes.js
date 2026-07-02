import express from "express";

import {
  getProperties,
  getPropertyById,
} from "../controllers/propertyController.js";

const router = express.Router();

// Public read-only routes
router.get("/", getProperties);
router.get("/:id", getPropertyById);

export default router;