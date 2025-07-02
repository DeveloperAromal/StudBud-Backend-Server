import express from "express";
import {
  createExamPost,
  getExamByClass,
  insertNewStatus,
  getStatusWithNamesAndMarks,
  postMarkForStudent,
  getExamBySubDomain,
} from "../controllers/exam.controller.js";

const router = express.Router();

router.post("/create/exam/post", createExamPost);
router.post("/insert/exam/status", insertNewStatus);
router.get("/get/exam/:classname/:subdomain", getExamByClass);
router.get("/get/exam/:subdomain", getExamBySubDomain);
router.get("/statusbyclassname/:examId", getStatusWithNamesAndMarks);
router.post("/updatemark", postMarkForStudent);

export default router;
