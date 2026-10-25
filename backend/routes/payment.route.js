import { Router } from "express";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


export const paymentRoute = Router();

paymentRoute.post("/create-order",authMiddleware,createOrder);
paymentRoute.post("/verify-payment",authMiddleware,verifyPayment);