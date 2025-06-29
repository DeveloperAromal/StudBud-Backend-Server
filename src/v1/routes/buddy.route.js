import express from "express";
import {
  acceptBud,
  rejectBud,
  reqForBuddy,
} from "../controllers/buddy.controller.js";

const router = express.Router();

router.post("/request/buddy", reqForBuddy);
router.post("/accept/buddy", acceptBud);
router.post("/reject/buddy", rejectBud);

export default router;
