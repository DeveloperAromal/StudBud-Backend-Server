import express from "express";
import {
  createNewSubdoamin,
  getAllDomain,
  getDomainById,
} from "../controllers/subdomain.controller.js";

const router = express.Router();

router.get("/getSubdomainList", getAllDomain);
router.get("/getSubdomainList/:subdomain", getDomainById);
router.post("/create/newSubdomain", createNewSubdoamin);

export default router; 
