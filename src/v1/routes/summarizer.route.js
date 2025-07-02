import express from "express";
import {
  questionsMaker,
  summarizerAi,
} from "../controllers/summarizer.controller.js";

const router = express.Router();

router.post("/get/summary", summarizerAi);
router.post("/get/questions", questionsMaker);
export default router;
