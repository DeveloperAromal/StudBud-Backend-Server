import express from "express";
import {
  createExamPost,
  getExamByClass,
  insertNewStatus,
} from "../controllers/exam.controller.js";

const router = express.Router();

router.post("/create/exam/post", createExamPost);
router.post("/insert/exam/status", insertNewStatus);
router.get("/get/exam/:classname", getExamByClass);

export default router;
