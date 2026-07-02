import express from "express";

import {
  createContact,
} from "../controllers/contactController.js";

const router = express.Router();

// Public contact-form submission only
router.post("/", createContact);

export default router;