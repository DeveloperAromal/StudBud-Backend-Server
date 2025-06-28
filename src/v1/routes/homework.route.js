import express from "express";
import { Protect } from "../middleware/auth.middleware.js";
import {
  fetchHomeworkByClass,
  homeworkUpload,
} from "../controllers/homework.controller.js";

const router = express.Router();

router.post("/homework/postHomework", homeworkUpload);
router.get("/get/homework/:classname", fetchHomeworkByClass);

export default router;
