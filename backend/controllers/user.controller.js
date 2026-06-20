import { User } from "../models/User.js";

export const getme= async(req,res)=>{

    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({
            message:"User not found!",
            status:"failed"
        })
        return res.status(200).json({
            message:"User fetched SuccessFully!",
            status:"success",
            user
        })

    } catch (error) {
        console.error("Internal server error",error);
        return res.status(500).json({
            message:"Internal Server Error",
            status:"failed"
        })
    }
}