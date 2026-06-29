import { Router } from "express";
import { getme, updateProfile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


export const userRoute = Router();

userRoute.get('/me',authMiddleware,getme);
userRoute.patch('/updateProfile',authMiddleware,upload.single("profilePicture"),updateProfile)