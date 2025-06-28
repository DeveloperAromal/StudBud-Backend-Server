import express from "express";
import { Protect } from "../middleware/auth.middleware.js";
import {
  fetchHomeworkByClass,
  homeworkUpload,
  updateHwStatus,
} from "../controllers/homework.controller.js";

const router = express.Router();

router.post("/homework/postHomework", Protect, homeworkUpload);
router.get("/get/homework/:classname", Protect, fetchHomeworkByClass);
router.post("/update/hwstatus", updateHwStatus);

export default router;
