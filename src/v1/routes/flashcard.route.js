import express from "express";
import { Protect } from "../middleware/auth.middleware.js";
import {
  getFlashCard,
  createFlash,
  updateFlash,
} from "../controllers/flashcard.controller.js";

const router = express.Router();

router.get("/get/flashcard/:flash_id", getFlashCard);
router.post("/update/flashcard/progress", updateFlash);
router.post("/generate/flashcard", createFlash);

export default router;
