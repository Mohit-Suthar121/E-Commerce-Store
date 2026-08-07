import Razorpay from "razorpay";
import crypto from 'crypto'
import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
import { User } from "../models/User.js";
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const { addressId } = req.body;


        if (!addressId) {
            return res.status(400).json({
                success: false,
                message: "address id is not given !"
            })
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found",
            })
        }

        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart || cart.items.length == 0) {
            return res.status(404).json({
                success: false,
                message: "cart not found!"
            })
        }

        const shippingAddress = user.shippingAddresses.find((add) => add._id.toString() === addressId);


        if (!shippingAddress) {
            return res.status(404).json({
                message: "Address not found!",
                success: false
            })
        }


        let subtotal = 0;
        let gstPrice = 0;





        cart.items.forEach((item) => {
            const itemSubtotal = item.product.price * item.quantity
            subtotal += itemSubtotal;
            gstPrice += itemSubtotal * item.product.gstRate / 100;
        })

        const shippingCost = subtotal >= 1000 ? 0 : 40;
        const totalAmount = subtotal + gstPrice + shippingCost;

        const options = {
            amount: Math.round(totalAmount * 100), // Razorpay expects amount in paise (1 INR = 100 paise)
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        }
        const razorpayOrder = await razorpay.orders.create(options);

        const orderedItems = cart.items.map((item) => {
            const gstAmount = item.product.gstRate / 100 * item.product.price * item.quantity;
            return {
                product: item.product._id,
                quantity: item.quantity,
                name: item.product.name,
                price: item.product.price,
                gstRate: item.product.gstRate,
                gstAmount,
                image: item.product.images[0].url
            }
        })

        const order = await Order.create({
            user: userId,
            shippingAddress,
            orderedItems,
            paymentInfo: {
                razorpayOrderId: razorpayOrder.id,
                status: "pending",
            },
            shippingCost,
            subtotal,
            totalAmount,
            totalGst: gstPrice

        })


        res.status(200).json({
            success: true,
            message: "order generated and saved to mongoDb as well",
            order: razorpayOrder,
            mongoOrderId: order._id
        })


    } catch (error) {
        console.error("Internal server error: ", error)
        res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
}



export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature,mongoOrderId } = req.body;
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                status: false,
                message: "missing payment details"
            })
        }
        
        const order = await Order.findById(mongoOrderId);
        
        if(!order){
            return res.status(404).json({
                success:false,
                message:"Order not found!"
            })
        }

        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const verifiedString = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest("hex");

        const isVerified = verifiedString === razorpay_signature;
        if (!isVerified) {
            order.paymentInfo.status="failed";
            await order.save();
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature"
            })
        }

        order.paymentInfo.razorpayPaymentId = razorpay_payment_id;
        order.paymentInfo.razorpaySignature = razorpay_signature;
        order.paymentInfo.status = "paid";
        order.paymentInfo.paidAt = Date.now();
        await order.save();


        res.status(200).json({
            success: true,
            message: "payment verified succesfully!"
        })

    } catch (error) {
        console.error("Internal server error: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}