import express from "express";
import {
  createExamPost,
  getExamByClass,
  insertNewStatus,
  getStatusWithNamesAndMarks,
  postMarkForStudent,
} from "../controllers/exam.controller.js";

const router = express.Router();

router.post("/create", createExamPost);
router.get("/get/:classname", getExamByClass);
router.post("/status", insertNewStatus);
router.get("/statusbyclassname/:classname", getStatusWithNamesAndMarks);
router.post("/updatemark", postMarkForStudent);

export default router;
