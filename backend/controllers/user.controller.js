import { User } from "../models/User.js";

export const getme= async(req,res)=>{

    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        console.log("The user Is; ",user);
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


export const updateProfile = async(req,res)=>{
    try {
        const {firstName,lastName,zipCode,city,phoneNo,street} = req.body;
        const userId = req.userId;
        const user = await User.findOneAndUpdate({_id:userId},{
            $set:{
                firstName,
                lastName,
                phoneNo,
                shippingAddress:{
                    zipCode,
                    city,
                    street
                }
            }
        },{new:true});
        if(!user) return res.status(404).json({
            message:"User not found",
            status:"failed"
        })
        return res.status(200).json({
            message:"Profile updated Successfully!",
            status:"success",
            user
        })

    } catch (error) {
        console.error("Internal server error",error);
        return res.status(500).json({
            message:"Internal server error",
            status:"failed"
        })
    }
}