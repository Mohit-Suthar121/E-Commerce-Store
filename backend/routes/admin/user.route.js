import { Router } from "express";
import { countUsers, getUsers } from "../../controllers/admin/user.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const userRoute = Router();

userRoute.get("/get-all-users",authMiddleware,getUsers)
userRoute.get("/stats",authMiddleware,countUsers);


export default userRoute