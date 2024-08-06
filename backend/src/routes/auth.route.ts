import express, { Request, Response } from "express";
import * as authController from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", authController.signup);

export default router;
