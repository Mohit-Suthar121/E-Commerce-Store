import { Router } from "express";
import { getAllProducts, getProduct, getProductsByIds } from "../controllers/product.controller.js";

const productRoute = Router();


productRoute.get("/get-all-products",getAllProducts);
productRoute.get("/get-product/:id",getProduct)
productRoute.post("/get-products-by-ids",getProductsByIds);
export default productRoute

