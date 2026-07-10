import { uploadToCloudinary } from "../config/cloudinaryConfig.js";
import { Product } from "../models/Product.model.js";

export const addProduct = async(req,res)=>{
    try {        
        const {name,price,stock,productDesc,subCategory,category,brandName} = req.body;         
        const files = req.files;
        console.log("Data received , and the data is: ",req.body);

        const product = await Product.create({
            name,price,stock,productDesc,subCategory,category,brandName
        })

        if(files){
            const uploadedImages = await Promise.all(files.map(async (file)=>{
                const uploadResponse = await uploadToCloudinary(file);
                return {
                    fileUrl:uploadResponse.secure_url,
                    publicId:uploadResponse.public_id
                }
            })) 
            console.log("The cloudinary uploaded images are: ",uploadedImages)

            product.images = uploadedImages;
        }

        await product.save();

        return res.status(200).json({
            message:"Data received successfully!",
            productData:product
        })

    } catch (error) {
        console.error("Some error occured!",error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }

}