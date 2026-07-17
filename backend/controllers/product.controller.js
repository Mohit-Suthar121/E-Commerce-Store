import { Product } from "../models/Product.model.js";




export const getAllProducts = async (req,res)=>{
    try {
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const brandName = req.query.brandName.toLowerCase();
        const category = req.query.category.toLowerCase();
        const minPrice = parseInt(req.query.minPrice);
        const maxPrice = parseInt(req.query.maxPrice);
        const search = req.query.search;

        let query = {};
        if(search.trim()){
            query.name={
                $regex:search.trim(),
                $options:"i"
            }
        }
        if(category!=="" && category!=="all"){
            query.category={
                $regex:category,
                $options:"i",
            }
        }
        if(brandName!=="" && brandName!=="all"){
            query.brandName={
                $regex:brandName,
                $options:"i"
            }
        }
        if(minPrice!=0 || maxPrice!=999999){
            query.price={
                $gt:minPrice,
                $lt:maxPrice
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
        console.error("Internal server error! ",error)
        return res.status(500).json({
            message:"Internal server error!"
        })
    }
}