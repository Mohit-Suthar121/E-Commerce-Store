import { User } from "../models/User.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendToken } from "../utils/sendToken.js";

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log("The request is just hit and the data is: ", name, email, password)
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already Exists"
            })
        }

        user = new User({
            name,
            email,
            password,
            role: "user"
        })

        user.otpCode = generateOtp().toString();
        user.otpExpires = new Date(Date.now() + 5 * 60 * 1000)
        await user.save();
        res.status(200).json({
            message: "OTP Sent successfully!",
            status: "success"
        })

    } catch (error) {
        console.error("Internal server Error", error);
        res.status(500).json({
            message: "Internal Server Error",
            status: "failed"
        })
    }

}


export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email }).select("+otpCode +otpExpires");
        const currentDate = Date.now();


        if (!user) return res.status(404).json({
            message: "User was not found in the database",
            status: "error"
        })
        console.log("the saved otp to the db: ",user.otpCode?.toString())
        console.log("received otp: ",otp?.toString())

        if ((user.otpCode?.toString() !== otp?.toString()) || (currentDate > user.otpExpires)) return res.status(400).json({
            message: "Entered OTP is either expired or not correct",
            status: "error"
        })

        user.otpCode = null;
        user.otpExpires = null;
        user.isVerified = true;
        await user.save();
        sendToken(user, 200, res);
    } catch (error) {
        console.error("Internal Server Error!", error);
    }



}


