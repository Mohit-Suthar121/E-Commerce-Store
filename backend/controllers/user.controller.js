import { uploadToCloudinary } from "../config/cloudinaryConfig.js";
import { User } from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";

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
        const file = req.file;
        console.log("The file is: ",file)
        const user = await User.findById(userId);

        if(!user) return res.status(404).json({
            message:"User not found",
            status:"failed"
        })

        user.firstName = firstName;
        user.lastName = lastName;
        user.phoneNo = phoneNo;
        user.shippingAddress.zipCode = zipCode;
        user.shippingAddress.city= city;
        user.shippingAddress.street=street;


        if(file){
            if(user.profilePic?.publicId) await cloudinary.uploader.destroy(user?.profilePic?.publicId);
            const uploadResponse = await uploadToCloudinary(file);
            user.profilePic.url = uploadResponse.secure_url;
            user.profilePic.publicId = uploadResponse.public_id;
            console.log("The file has been uploaded to cloudinary: ");
            console.log("the profilePicUrl:",uploadResponse.secure_url);
            console.log("the publicId:",uploadResponse.public_id);
        }

        await user.save();
        
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