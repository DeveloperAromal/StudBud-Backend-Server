import express from "express";
import { Protect } from "../middleware/auth.middleware.js";
import {
  createFourmPost,
  getDissusionData,
  getPostByClass,
  InsertNewComment,
} from "../controllers/fourm.controller.js";

const router = express.Router();

router.post("/insert/comment", InsertNewComment);
router.post("/create/fourm/post", createFourmPost);
router.get("/get/fourm/post/:classname", getPostByClass);
router.get("/get/disscusiondatabyid/:disid", getDissusionData);

export default router;
