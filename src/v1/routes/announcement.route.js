import express from "express";
import { Protect } from "../middleware/auth.middleware.js";
import {
  createAnnouncementPost,
  getAnnouncementByClass,
} from "../controllers/announcement.controller.js";

const router = express.Router();

router.post("/create/announcement/post", Protect, createAnnouncementPost);
router.get("/get/announcement/post/:classname", getAnnouncementByClass);

export default router;
