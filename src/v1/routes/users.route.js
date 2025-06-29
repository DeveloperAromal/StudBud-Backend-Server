import {
  fetchUser,
  fetchUserByClass,
} from "../controllers/users.controller.js";
import express from "express";

const router = express.Router();

router.get("/userById/:s_id", fetchUser);
router.get("/userByclass/:classname", fetchUserByClass);

export default router;
