import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { addProduct, deleteProduct, editProduct, getAllProducts, getSingleProduct } from "../controllers/product.controller.js";

export const productRoute = Router();

productRoute.post('/add-product',authMiddleware,upload.array("productImages",5),addProduct);
productRoute.patch('/edit-product/:id',authMiddleware,upload.array("productImages",5),editProduct)
productRoute.get('/get-all-products',authMiddleware,getAllProducts)
productRoute.get('/get-product/:id',authMiddleware,getSingleProduct)
productRoute.delete('/delete-product/:id',authMiddleware,deleteProduct)
