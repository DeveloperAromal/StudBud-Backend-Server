import express from "express";
import { Protect } from "../middleware/auth.middleware.js";
import {
  createFourmPost,
  getDissusionData,
  getPostByClass,
} from "../controllers/fourm.controller.js";

const router = express.Router();

router.post("/create/fourm/post", Protect, createFourmPost);
router.get("/get/fourm/post/:classname", getPostByClass);
router.get("/get/disscusiondatabyid/:disid", getDissusionData);

export default router;
