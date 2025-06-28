import express from "express";
import {
  getAbsentDays,
  markStudentsAbsentes,
} from "../controllers/attendance.controller.js";

const router = express.Router();
router.post("/markabsentees", markStudentsAbsentes);
router.get("/getAbsentes/:s_id", getAbsentDays);

export default router;
