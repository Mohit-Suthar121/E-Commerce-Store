import mongoose from "mongoose";
import { addressSchema } from "./address.model.js";


const orderedItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
    },
    gstRate: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    gstAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    image: {
        type: String,
        required: true
    }
})
 
const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    shippingAddress: {
        type:addressSchema,
        required:true
    },

    orderedItems: {
        type: [orderedItemSchema],
        required:true
    },
    paymentInfo: {
        razorpayOrderId: { type: String, required: true },
        razorpayPaymentId: { type: String },
        razorpaySignature: { type: String },
        status: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending"
        },
        paidAt: { type: Date }
    },
    orderStatus: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Processing"
    },
    shippingCost: {
        type: Number,
        required: true,
        default: 0
    },
    subtotal:{
        type:Number,
        required:true,
        min:0
    },
    totalAmount:{
        type:Number,
        required:true,
        min:0
        
    },
    totalGst: {
        type:Number,
        required:true,
        min:0
    },
    deliveredAt: {
        type: Date
    }
}, { timestamps: true })



export const Order = mongoose.model("order", orderSchema);