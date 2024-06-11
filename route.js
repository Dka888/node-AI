import { Router } from "express";
import { summarizeText } from "./controller.js";
import { identifyData } from "./middleware.js";

const router = Router();

router.post('/', identifyData, summarizeText)

export default router;