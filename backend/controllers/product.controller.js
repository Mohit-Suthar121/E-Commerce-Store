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
                    url:uploadResponse.secure_url,
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


export const getAllProducts = async(req,res)=>{
    try {
        
        const page= parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        console.log("The page and limits are: ",page,limit);
        const skip = limit * (page-1);
        const products = await Product.find().skip(skip).limit(limit).sort({createdAt:-1});
        const totalPages = Math.ceil(await Product.countDocuments()/limit);
        res.status(200).json({
            products,
            totalPages,
            message:"success",
        })

    } catch (error) {
        console.log("couldn't get products: ",error);
        return res.status(500).json({
            message:"Internal server error, couldn't get products!"
        })
    }
}