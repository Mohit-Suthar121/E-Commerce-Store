import { Router } from "express";
import { register, verifyOtp } from "../controllers/auth.controller.js";



export const authRoute = Router();


authRoute.post('/register',register)
authRoute.post('/verify',verifyOtp)