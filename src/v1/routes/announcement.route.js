import express from "express";
import { Protect } from "../middleware/auth.middleware.js";
import {
  createAnnouncementPost,
  getAnnouncementByClass,
  getAnnouncementBySubdomain,
} from "../controllers/announcement.controller.js";

const router = express.Router();

router.post("/create/announcement/post", createAnnouncementPost);
router.get(
  "/get/announcement/post/:classname/:subdomain",
  getAnnouncementByClass
);
router.get("/get/announcement/post/:subdomain", getAnnouncementBySubdomain);

export default router;
