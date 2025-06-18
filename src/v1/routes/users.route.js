import { fetchUsers } from "../controllers/users.controller.js";
import express from "express";
const router = express.Router();

router.get("/usersById/:s_id", fetchUsers);

export default router;
