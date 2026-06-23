import { Router } from "express";
import { googleLogin, login, logout, register, verifyOtp } from "../controllers/auth.controller.js";



export const authRoute = Router();


authRoute.post('/register',register);
authRoute.post('/verify',verifyOtp);
authRoute.post('/login',login);
authRoute.get('/logout',logout);
authRoute.post('/google',googleLogin);