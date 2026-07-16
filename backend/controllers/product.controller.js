import { Product } from "../models/Product.model.js";




export const getAllProducts = async (req,res)=>{
    try {
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const search = req.query.search;

        let query = {};
        if(search.trim()){
            query.name={
                $regex:search.trim(),
                $options:"i"
            }
        }

        const skip = (page-1)*limit;
        const totalPages = Math.ceil(await Product.countDocuments()/limit);
        const products = await Product.find(query).limit(limit).skip(skip);

        return res.status(200).json({
            message:"products fetched successfully!",
            products,
            totalPages
        })

    } catch (error) {
        console.error("Internal server error!")
        return res.status(500).json({
            message:"Internal server error!"
        })
    }
}