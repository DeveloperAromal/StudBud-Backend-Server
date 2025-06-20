import express from "express";
import { Protect } from "../middleware/auth.middleware.js";
import {
  createFlashCardPost,
  getFlashCardPost,
} from "../controllers/flashcard.controller.js";

const router = express.Router();

router.post("/create/flashcard/create", createFlashCardPost);
router.get("/get/flashcard/get/", getFlashCardPost);

export default router;
