import express from "express";

import {
  getBlogs,
  getBlogBySlug,
} from "../controllers/blogController.js";

const router = express.Router();

// Public read-only blog routes
router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

export default router;