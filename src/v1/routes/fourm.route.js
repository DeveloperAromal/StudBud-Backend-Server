import express from "express";
import { Protect } from "../middleware/auth.middleware.js";
import {
  createFourmPost,
  getDissusionData,
  getPostByClass,
  InsertNewComment,
} from "../controllers/fourm.controller.js";

const router = express.Router();

router.post("/create/fourm/post", Protect, createFourmPost);
router.get("/get/fourm/post/:classname", getPostByClass);
router.get("/get/disscusiondatabyid/:disid", getDissusionData);
router.post("/insert/comment", InsertNewComment);

export default router;
