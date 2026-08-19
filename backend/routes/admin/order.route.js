import { Router } from "express";
import { getAllOrders } from "../../controllers/admin/order.controller.js";

export const orderRoute = Router();

orderRoute.get("/orders",getAllOrders)


