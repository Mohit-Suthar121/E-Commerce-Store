import { Router } from "express";
import { getAllProducts } from "../controllers/product.controller.js";

const productRoute = Router();


productRoute.get("/get-all-products",getAllProducts);

export default productRoute

