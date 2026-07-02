import express from "express";

import {
  createSellRequest,
} from "../controllers/sellController.js";

const router = express.Router();

// Public sell-request form submission only
router.post("/", createSellRequest);

export default router;