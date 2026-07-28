import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { generateProduct } from "../controllers/ai.controller.js";

export const aiRoute = Router();

aiRoute.post("/generate-product",authMiddleware,generateProduct);