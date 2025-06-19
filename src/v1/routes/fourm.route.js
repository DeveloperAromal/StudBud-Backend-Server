import express from "express";
import { Protect } from "../middleware/auth.middleware.js";
import { createFourmPost, getPostByClass } from "../controllers/fourm.controller.js";

const router = express.Router();

router.post("/create/fourm/post", Protect, createFourmPost);
router.get("/get/fourm/post/:classname", Protect, getPostByClass);

export default router;
