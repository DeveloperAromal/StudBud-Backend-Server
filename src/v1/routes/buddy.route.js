import express from "express";
import {
  acceptBud,
  buddyQuestions,
  getStatusByIdFrom,
  getStatusByIdReq,
  personalAiAgentForStudBud,
  rejectBud,
  reqForBuddy,
} from "../controllers/buddy.controller.js";

const router = express.Router();

router.post("/request/buddy", reqForBuddy);
router.post("/accept/buddy", acceptBud);
router.post("/reject/buddy", rejectBud);
router.get("/get/statusFrom/:s_id", getStatusByIdFrom);
router.get("/get/statusReq/:s_id", getStatusByIdReq);
router.get("/post/questions/:question", buddyQuestions);
router.get("/post/questions/:question", personalAiAgentForStudBud);

export default router;
