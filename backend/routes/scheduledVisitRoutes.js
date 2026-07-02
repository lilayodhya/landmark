import express from "express";

import {
  createScheduledVisit,
} from "../controllers/scheduledVisitController.js";

const router = express.Router();

// Public visit-booking form submission only
router.post("/", createScheduledVisit);

export default router;