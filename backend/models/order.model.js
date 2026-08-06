import mongoose from "mongoose";
import { addressSchema } from "./address.model.js";


const orderedItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
        required:true
    }
})

const orderSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    },
    shippingAddress:addressSchema,
    orderItems:[orderedItemSchema],
    paymentInfo:{
        razorpayOrderId:{type:String,required:true},
        razorpayPaymentId: { type: String },
        razorpaySignature: { type: String },
        status:{
            type:String,
            enum:["pending","paid","failed"],
            default:"pending"
        },
        paidAt:{type:Date}
    },
    orderStatus:{
        type:String,
        enum:["Processing","Shipped","Delivered","Cancelled"],
        default:"Processing"
    },
    deliveredAt:{
        type:Date
    }
},{timestamps:true})

export const Order = mongoose.model("order",orderSchema);