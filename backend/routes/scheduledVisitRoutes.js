import express from "express";

import {
    getScheduledVisits,
    createScheduledVisit,
    deleteScheduledVisit
} from "../controllers/scheduledVisitController.js";

const router = express.Router();

router.get("/", getScheduledVisits);

router.post("/", createScheduledVisit);

router.delete("/:id", deleteScheduledVisit);

export default router;