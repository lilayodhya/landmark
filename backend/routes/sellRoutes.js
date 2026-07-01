import express from "express";

import {
    getSellRequests,
    createSellRequest,
    deleteSellRequest
} from "../controllers/sellController.js";

const router = express.Router();

router.get("/", getSellRequests);

router.post("/", createSellRequest);

router.delete("/:id", deleteSellRequest);

export default router;