import { Router } from "express";
import { getme } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


export const userRoute = Router();

userRoute.get('/me',authMiddleware,getme);