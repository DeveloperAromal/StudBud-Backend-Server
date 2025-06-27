import {
  signInTeacher,
  signUpTeacher,
  signUpUser,
  validateTeacher,
} from "../controllers/auth.controller.js";
import { signInUser } from "../controllers/auth.controller.js";
import { validateUser } from "../controllers/auth.controller.js";
import { Protect } from "../middleware/auth.middleware.js";
import express from "express";

const router = express.Router();

router.get("/user/authentication/protect/validate", Protect, validateUser);
router.post("/user/createUser", signUpUser);
router.post("/user/loginUser", signInUser);

router.get("/user/authentication/protect/validate/teacher", Protect, validateTeacher);
router.post("/user/createTeacher", signUpTeacher);
router.post("/user/loginTeacher", signInTeacher);

export default router;
