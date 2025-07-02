import express from "express";
import {
  createMeetingLink,
  getMeetingData,
  getMeetingDataBySubdomain,
} from "../controllers/zoom.controller.js";

const router = express.Router();

router.post("/create/meet", createMeetingLink);

router.get("/get/meetdata/:classname/:subdomain", getMeetingData);
router.get("/get/meetdata/:subdomain", getMeetingDataBySubdomain);

export default router;
