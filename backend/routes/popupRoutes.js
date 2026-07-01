import express from "express";
import {
    getPopups,
    createPopup,
    deletePopup
} from "../controllers/popupController.js";

const router = express.Router();

router.get("/", getPopups);
router.post("/", createPopup);
router.delete("/:id", deletePopup);

export default router;