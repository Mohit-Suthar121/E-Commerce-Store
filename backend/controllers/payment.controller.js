import Razorpay from "razorpay";
import crypto from 'crypto'
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
    try {

        const { amount } = req.body;
        console.log("the received amount is: ",amount)
        if (!amount || amount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid amount"
            })
        }
        const options = {
            amount: Math.round(amount * 100), // Razorpay expects amount in paise (1 INR = 100 paise)
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        }
        console.log("the received another amount is: ",amount)

        const order = await razorpay.orders.create(options);
        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        console.error("Internal server error: ",error)
        res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }
}

export const verifyPayment = (req, res) => {
    try {
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
        if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
            return res.status(400).json({
                status:false,
                message:"missing payment details"
            })
        }
        const body = razorpay_order_id+'|'+razorpay_payment_id;

        const verifiedString = crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest("hex");

        const isVerified = verifiedString===razorpay_signature;
        if(isVerified){

            return res.status(200).json({
                success:true,
                message:"payment verified succesfully!"
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Invalid payment signature"
            })
        }
    } catch (error) {
        console.error("Internal server error: ",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}