import express from "express";
import { Protect } from "../middleware/auth.middleware.js";
import {
  fetchHomeworkByClass,
  fetchHomeworkBySubdomain,
  homeworkUpload,
  updateHwStatus,
} from "../controllers/homework.controller.js";

const router = express.Router();

router.post("/homework/postHomework", homeworkUpload);
router.get("/get/homework/:subdomain", fetchHomeworkBySubdomain);
router.get("/get/homework/:classname/:subdomain", fetchHomeworkByClass);
router.post("/update/hwstatus", updateHwStatus);
router.post("/homework/postHomework", homeworkUpload);

export default router;
