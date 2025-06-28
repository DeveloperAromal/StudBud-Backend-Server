import express from "express";
import { createMeetingLink } from "../controllers/zoom.controller.js";

const router = express.Router();

router.post("/create/meet", createMeetingLink);

export default router;
