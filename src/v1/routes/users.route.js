import { fetchUser } from "../controllers/users.controller.js";
import express from "express";

const router = express.Router();

router.get("/userById/:s_id", fetchUser);

export default router;
