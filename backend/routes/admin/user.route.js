import { Router } from "express";
import { getUsers } from "../../controllers/admin/user.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const userRoute = Router();

userRoute.get("/get-all-users",authMiddleware,getUsers)


export default userRoute