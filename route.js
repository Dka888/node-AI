import { Router } from "express";
import { summarizeText } from "./controller.js";
import { identifyData } from "./middleware.js";

const router = Router();

router.post('/summarize', identifyData, summarizeText)

export default router;