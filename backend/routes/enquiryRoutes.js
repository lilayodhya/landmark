import express from "express";

import {
  createEnquiry,
} from "../controllers/enquiryController.js";

const router = express.Router();

// Public form submission only
router.post("/", createEnquiry);

export default router;