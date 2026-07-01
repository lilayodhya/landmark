import express from "express";

import {
    getEnquiries,
    createEnquiry,
    deleteEnquiry
} from "../controllers/enquiryController.js";

const router = express.Router();

router.get("/", getEnquiries);

router.post("/", createEnquiry);

router.delete("/:id", deleteEnquiry);

export default router;