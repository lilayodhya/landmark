import express from "express";
import {
  createPopup,
} from "../controllers/popupController.js";

const router = express.Router();

// Public welcome-popup form submission only
router.post("/", createPopup);

export default router;