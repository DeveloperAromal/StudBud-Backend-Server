import express from "express";
import { getLeaderboardData } from "../controllers/leaderboard.controller.js";

const router = express.Router();

router.get("/get/leaderboard/:classname", getLeaderboardData);

export default router;
