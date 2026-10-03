import { Cart } from "../models/cart.model.js";
import { Product } from "../models/Product.model.js";

export const addToCart = async(req,res)=>{
    try {
        const userId = req.userId;
        
        const {product, quantity}  = req.body;
        if(!product || quantity<1){
            return res.status(400).json({
                message:"Invalid product or quantity"
            })
        }

        const exists = await Product.exists({_id:product});
        if(!exists){
            return res.status(404).json({
                message:"product not found!"
            })
        }

        let cart = await Cart.findOne({user:userId});
        if(!cart){
            cart = await Cart.create({
                user:userId,
                items:[
                    {       
                        product,
                        quantity
                    }
                ]
            })
            return res.status(201).json({
                message:"new cart created Successfully!",
                cart
            })
        }

        const existing = cart.items.find((p)=>p.product.equals(product));

        if(existing){
            existing.quantity = quantity;
        }

        else{
            cart.items.push({
                product,
                quantity

            })
        }

        await cart.save();
        const populatedCart = await cart.populate("items.product");
        return res.status(200).json({
            message:"product added to cart successfully!",
            cart:populatedCart
        })
    } catch (error) {
        console.error("couldn't add product to cart!",error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}


export const getCart = async(req,res)=>{
    try {
        const userId = req.userId;
        const cart = await Cart.findOne({user:userId}).populate("items.product");
        if(!cart){
            return res.status(404).json({
                message:"cart not found",
            })
        }
        return res.status(201).json({
            message:"cart found successfully",
            cart
        })
    } catch (error) {
        console.error("Internal server error",error);
        return res.status(500).json({
            message:"Internal server error"
        })   
    }
}

export const updateProductQuantity = async(req,res)=>{
    try {
        const userId = req.userId;
        const productId = req.params.id;
        const {quantity} = req.body;

        if(!Number.isInteger(quantity) || quantity<1){
            return res.status(400).json({
                message:"invalid quantity"
            })
        }

        const cart = await Cart.findOne({user:userId});
        if(!cart){
            return res.status(404).json({
                message:"cart not found!"
            })
        }

        const item = cart.items.find((item)=>item.product.equals(productId));
        if(!item){
            return res.status(404).json({
                message:"item not found!"
            })
        }

        item.quantity = quantity;

        await cart.save();
        return res.status(200).json({
            message:"quantity updated successfully!",
            item
        })
    } catch (error) {
        console.error("Internal server error!",error);
        return res.status(500).json({
            message:"Internal server error!"
        })

    }
}

export const deleteFromCart = async(req,res)=>{
    try {
        const userId = req.userId;
        const productId = req.params.productId;
        const cart = await Cart.findOne({user:userId});
        if(!cart){
            return res.status(404).json({
                message:"cart not found!"
            })
        }
        // check if the product even exists
        const item = cart.items.find((item)=>item.product.equals(productId));
        if(!item){
            return res.status(404).json({
                message:"product not found!"
            })
        }

        cart.items = cart.items.filter((item)=>!item.product.equals(productId));
        await cart.save();
        return res.status(200).json({
            message:"product deleted successfully",
        })


    } catch (error) {
        console.error("Internal server error",error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}


export const getProducts = async(req,res)=>{
    try {
        const userId = req.userId;
        const cart = await Cart.findOne({user:userId});
        if(!cart) return res.json(404).json({
            message:"Cart not found!"
        })
        const products = cart.items.populate("product");


        return res.status(201).json({
            message:"cart and products fetched successfully!",
            products
        })


    } catch (error) {
        console.error("Internal server Error!");
        return res.status(500).json({
            message:"Internal server error!"
        })
    }
}