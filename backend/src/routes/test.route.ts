import express, { Request, Response } from "express";
import * as testConrtoller from "../controllers/test.controller";

const router = express.Router();

router.route("/").get(testConrtoller.getTest);

export default router;
