import express from "express";
import {
  createExamPost,
  getExamByClass,
} from "../controllers/exam.controller.js";

const router = express.Router();

router.post("/create/exam/post", createExamPost);
router.get("/get/exam/:classname", getExamByClass);

export default router;
