import { Order } from "../../models/order.model.js";


export const getAllOrders = async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8;
        const skip = limit*(page-1);
        
        const [orders,orderCount] = await Promise.all([
            Order.find().skip(skip).sort({createdAt:-1}).limit(limit).populate("user","name email").select(),
            Order.countDocuments()
        ])

        return res.status(200).json({
            message:orders.length>0?"orders found successfully!":"No orders found!",
            orders,
            pagination:{
                orderCount,
                page,
                limit,
                totalPages:Math.ceil(orderCount/limit)
            }
        })

    } catch (error) {
        console.error("Internal server error",error);
        return res.status(500).json({
            message:"Internal server error"
        })

    }
}