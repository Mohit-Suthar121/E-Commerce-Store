import { Cart } from "../models/cart.model.js";
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


export const getProduct = async (req,res)=>{
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if(!product) return res.status(404).json({
            message:"product not found!"
        })
        return res.status(200).json({
            message:"product found",
            product
        })


    } catch (error) {
        console.error("internal server error! ",error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const getProductsByIds = async (req,res)=>{
    try {
        const {productIds} = req.body;
        console.log("the product ids are: ",productIds);

        const products = await Product.find({
            _id:{$in:productIds}
        });

        // const productsWithQuantity = products.map((p)=>{
        //     const cartItem = {
        //         product:p,
        //         quantity:fetchedProducts.find((fp)=>fp.productId===p._id.toString()).quantity
        //     }
        //     return cartItem
        // })
        
        return res.status(200).json({
            message:products.length>0?"Products found successfully!":"No products found!",
            products
        })


    } catch (error) {
        console.error("Internal server error! and the error is: ",error);
        return res.status(500).json({
            message:"Internal server error!"
        })
    }
}
