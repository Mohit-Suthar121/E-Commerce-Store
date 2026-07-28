import { Router } from "express";
import { getAllProducts, getProduct } from "../controllers/product.controller.js";

const productRoute = Router();


productRoute.get("/get-all-products",getAllProducts);
productRoute.get("/get-product/:id",getProduct)

export default productRoute

