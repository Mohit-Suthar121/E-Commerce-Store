import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";
import { addProduct, countProducts, deleteProduct, editProduct, getAllProducts, getSingleProduct } from "../../controllers/admin/product.controller.js";

const productRoute = Router();

productRoute.post('/add-product',authMiddleware,upload.array("productImages",5),addProduct);
productRoute.patch('/edit-product/:id',authMiddleware,upload.array("productImages",5),editProduct)
productRoute.get('/get-all-products',authMiddleware,getAllProducts)
productRoute.get('/get-product/:id',authMiddleware,getSingleProduct)
productRoute.get("/stats",authMiddleware,countProducts);
productRoute.delete('/delete-product/:id',authMiddleware,deleteProduct)


export default productRoute;