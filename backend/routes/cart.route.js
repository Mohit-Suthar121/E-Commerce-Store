import { Router } from "express";
import { addToCart, deleteFromCart, getCart, getProducts, updateProductQuantity } from "../controllers/cart.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


export const cartRoute = Router();

cartRoute.post('/add-to-cart',authMiddleware,addToCart);
cartRoute.get('/get-cart',authMiddleware,getCart);
cartRoute.get('/products',authMiddleware,getProducts);
cartRoute.patch('/product/:id/update-quantity',authMiddleware,updateProductQuantity);
cartRoute.delete('/product/:productId/delete-product',authMiddleware,deleteFromCart);


