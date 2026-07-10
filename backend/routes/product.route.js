import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { addProduct } from "../controllers/product.controller.js";

export const productRoute = Router();

productRoute.post('/add-product',authMiddleware,upload.array("productImages",5),addProduct);
productRoute.get('/products',authMiddleware,)