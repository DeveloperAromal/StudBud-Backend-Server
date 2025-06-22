import express from "express";
import { Protect } from "../middleware/auth.middleware.js";
import {
  // createFlashCardPost,
  getFlashCardPost,
  // generateFlashCardFromYoutubePost,
  getFlashTranscript,
} from "../controllers/flashcard.controller.js";

const router = express.Router();

// router.post("/create/flashcard/create", createFlashCardPost);
router.get("/get/flashcard/get/", getFlashCardPost);
// router.post("/generate/flashcard/transcript", generateFlashCardFromYoutubePost);

router.post("/generate/transcript", getFlashTranscript);

export default router;
