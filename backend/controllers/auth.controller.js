import { User } from "../models/User.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";

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


        const emailHtmlTemplate = `
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; rounded: 12px;">
                <h2 style="color: #111; text-align: center;">Welcome to SHORTCART</h2>
                <p style="font-size: 14px; color: #555;">Thank you for registering. Use the following one-time password (OTP) to complete your account verification. This code is valid for 5 minutes:</p>
                <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; tracking-content: 4px; color: #10b981; border-radius: 8px; margin: 20px 0;">
                    ${user.otpCode}
                </div>
                <p style="font-size: 11px; color: #999; text-align: center;">If you did not request this registration, please safely ignore this email.</p>
            </div>
        `;

        await sendEmail({
            email: user.email,
            subject: "Verify Your SHORTCART Account",
            html: emailHtmlTemplate
        });

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
            message: "User not found!",
            status: "error"
        })
        console.log("the saved otp to the db: ", user.otpCode?.toString())
        console.log("received otp: ", otp?.toString())

        if (user.otpCode?.toString() !== otp?.toString()) return res.status(400).json({
            message: "OTP is incorrect",
            status: "error"
        })

        else if (currentDate > user.otpExpires) return res.status(400).json({
            message: "OTP has been expired",
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


export const login = async (req, res) => {
    try {
        console.log("The data received is: ", req.body)
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) return res.status(404).json({
            message: "User not found",
            status: "failed"

        })

        const isPasswordVerified = await user.verifyPassword(password);
        if (!isPasswordVerified) return res.status(401).json({
            message: "Incorrect Password",
            staus: "failed"
        })

        const otp = generateOtp();
        user.otpCode = otp;
        user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
        await user.save();
        const emailHtmlTemplate = `
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; rounded: 12px;">
                <h2 style="color: #111; text-align: center;">Welcome to SHORTCART</h2>
                <p style="font-size: 14px; color: #555;">WELCOME BACK. Use the following one-time password (OTP) to complete your account verification. This code is valid for 5 minutes:</p>
                <div style="background-color: #f9f9f9; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; tracking-content: 4px; color: #10b981; border-radius: 8px; margin: 20px 0;">
                    ${user.otpCode}
                </div>
                <p style="font-size: 11px; color: #999; text-align: center;">If you did not request this registration, please safely ignore this email.</p>
            </div>
        `;

        await sendEmail({
            email: user.email,
            subject: "Verify Your SHORTCART Account",
            html: emailHtmlTemplate
        });

        return res.status(200).json({
            message: "OTP sent successfully!",
            status: "success",
            user
        })
    } catch (error) {
        console.error("Internal server Error", error);
        return res.status(500).json({
            message: "Internal server error",
            status: "failed"
        })
    }
}


export const logout = async (req, res) => {
    try {
        const cookieOptions = {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        }

        return res.clearCookie("token", cookieOptions).status(200).json({
            message: "logged out successfully!",
            status: "success"
        })
    } catch (error) {
        console.error("Error while logging out: ", error);
        return res.status(500).json({
            message: "Internal server error",
            status: "failed"
        })
    }
}


export const googleLogin = async (req,res) =>{
    const {token} = req.body;
    try {
        if(!token) return res.status(400).json({
            message:"Google token payload is missing.",
            status:"failed"
        })
        const tokenVerifyResponse = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
        const googleProfile = await tokenVerifyResponse.json();
        console.log("The google profile is: ",googleProfile)
        if(!googleProfile.email){
            return res.status(400).json({
                message:"Google authentication failed. Access token is invalid.",
                status:"failed"
            })
        }
        const {name,email} = googleProfile;
        let user = await User.findOne({email});
        if(!user){
            user = new User({
                name,
                email,
                password: Math.random().toString(36).slice(-12),
                role:"user",
                isVerified:true,
            })
            await user.save();
        }

        sendToken(user,200,res);
    } catch (error) {
        console.error("Some error occured!: ",error);
        return res.status(500).json({
            message:"Internal server error",
            status:"failed"
        })
    }
}