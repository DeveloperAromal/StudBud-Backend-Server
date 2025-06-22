import express from "express";
import { Protect } from "../middleware/auth.middleware.js";
import {
  createFlashCardPost,
  getFlashCardPost,
  generateFlashCardFromYoutubePost,
} from "../controllers/flashcard.controller.js";

const router = express.Router();

router.post("/create/flashcard/create", createFlashCardPost);
router.get("/get/flashcard/get/", getFlashCardPost);
router.post("/generate/flashcard/transcript", generateFlashCardFromYoutubePost);

export default router;
