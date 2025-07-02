import express from "express";
import {
  createMeetingLink,
  getMeetingData,
} from "../controllers/zoom.controller.js";

const router = express.Router();

router.post("/create/meet", createMeetingLink);

router.get("/get/meetdata/:classname/:subdomain", getMeetingData);

export default router;
