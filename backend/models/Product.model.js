import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Product name is required"],
        trim:true,
        minlength: [3, "Product name must be at least 3 characters"],
        maxlength: [100, "Product name cannot exceed 100 characters"]

    },
    price:{
        type:Number,
        required:[true,"Product's price is required"],
        min:[0,"price cannot be negative"]
    },
    gstRate:{
        type:Number,
        required:true,
        min:0,
        max:100,
    },
    stock:{
        type:Number,
        required:[true,"Product stock volume is required"],
        min:[0,"Stock cannot be negative"],
        default:0
    },
    category:{
        type:String,
        required:[true,"category is required!"],
        enum:[
        "Electronics",
        "Fashion",
        "Home & Kitchen",
        "Beauty & Personal Care",
        "Books",
        "Sports & Fitness",
        "Toys & Games",
        "Grocery",
        "Health",
        "Automotive",
        "Jewelry",
        "Pet Supplies",
        "Office Supplies",
        "Footwear",
        "Accessories",
        "Others"
        ]

    },
    subCategory:{
        type:String,
        default:""
    },
    brandName:{
        type:String,
        default:""
    },
    productDesc:{
        type:String,
        default:"",
    },
    highlights:[
        {
            title:{
                type:String,
                default:""
            },
            description:{
                type:String,
                default:""
            }
        }
    ],
    images:[{
        url:{
            type:String,
            default:""
        },
        publicId:{
            type:String,
            default:null
        }
    }]

},{timestamps:true})

export const Product = mongoose.model("Product",productSchema);