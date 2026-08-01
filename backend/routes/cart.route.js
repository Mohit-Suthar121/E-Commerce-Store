import { Router } from "express";
import { addToCart, getCart, updateProductQuantity } from "../controllers/cart.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


export const cartRoute = Router();

cartRoute.post('/add-to-cart',authMiddleware,addToCart);
cartRoute.get('/get-cart',authMiddleware,getCart);
cartRoute.patch('/product/:id/update-quantity',authMiddleware,updateProductQuantity);


