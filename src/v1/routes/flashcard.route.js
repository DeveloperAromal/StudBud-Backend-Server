import express from "express";
import { Protect } from "../middleware/auth.middleware.js";
import { createFlashCardPost } from "../controllers/flashcard.controller.js";

const router = express.Router();

router.post("/create/flashcard/create", Protect, createFlashCardPost);

export default router;
