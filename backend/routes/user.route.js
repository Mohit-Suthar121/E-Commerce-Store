import { Router } from "express";
import { addAddress, editAddress, getAddresses, getme, updateProfile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


export const userRoute = Router();

userRoute.get('/me',authMiddleware,getme);
userRoute.patch('/updateProfile',authMiddleware,upload.single("profilePicture"),updateProfile)
userRoute.post('/addresses/add-address',authMiddleware,addAddress)
userRoute.get('/addresses/get-all-addresses',authMiddleware,getAddresses)
userRoute.patch('/addresses/edit-address/:id',authMiddleware,editAddress)