import { Router } from "express";
import { register } from "../controllers/auth.controller.js";



export const authRoute = Router();


authRoute.post('/register',register)
// authRoute.post('/login')
// authRoute.get('/logout')
