import { deleteFromCloudinary, uploadToCloudinary } from "../../config/cloudinaryConfig.js";
import { Product } from "../../models/Product.model.js";
// import { generateDescription } from "../../services/ai.service.js";


export const addProduct = async (req, res) => {
    try {
        const { name, price, stock, productDesc, subCategory, category, brandName } = req.body;
        const files = req.files;
        console.log("Data received , and the data is: ", req.body);

        const product = new Product({
            name, price, stock, productDesc, subCategory, category, brandName
        })

        if (files) {
            const uploadedImages = await Promise.all(files.map(async (file) => {
                const uploadResponse = await uploadToCloudinary(file);
                return {
                    url: uploadResponse.secure_url,
                    publicId: uploadResponse.public_id
                }
            }))
            console.log("The cloudinary uploaded images are: ", uploadedImages)
            product.images = uploadedImages;
        }

        const prompt = `You are an expert ecommerce copywriter specializing in consumer electronics.

Your task is to generate professional ecommerce content for the given product.

Product Name:${name}

Instructions:
- Generate an engaging, accurate product description suitable for an ecommerce website.
- Do not invent unrealistic or non-existent features.
- Base the content on the product's commonly known specifications and capabilities.
- Use a professional yet persuasive tone.
- The product description should be around 100-180 words.
- Then extract 4-6 key highlights from the product.
- Each highlight should have:
  - a short marketing-friendly title (2-6 words)
  - a concise description (1-3 sentences)
- Rewrite everything in your own words.
- Do NOT use markdown.
- Do NOT include HTML.
- Do NOT include explanations.
- Return ONLY valid JSON matching the following schema.

Output Format:

{
  "productDesc": "string",
  "highlights": [
    {
      "title": "string",
      "description": "string"
    }
  ]
}  `
        // const aiResponse = await generateDescription(prompt);
        // console.log("the ai response was: ",aiResponse)
        // console.log("the type of the response is: ",typeof(aiResponse));
        // const parsedResponse = JSON.parse(aiResponse);
        // product.productDesc = parsedResponse.productDesc;
        // product.highlights = parsedResponse.highlights;
        await product.save();

        return res.status(200).json({
            message: "Data received successfully!",
            productData: product,
            aiResponse
        })

    } catch (error) {
        console.error("Some error occured!", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }

}

export const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const newImages = req.files;
        const { name, price, stock, productDesc, subCategory, category, brandName, existingImages } = req.body
        const remainingImages = JSON.parse(existingImages);
        console.log("the remianing images are: ",remainingImages)
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "product was not found"
            })
        }


        const newImagesArray = await Promise.all(newImages.map(async (image) => {
            const uploadedImage = await uploadToCloudinary(image);
            return {
                url: uploadedImage.secure_url,
                publicId: uploadedImage.public_id
            }
        }))

        const toDeleteImages = product?.images?.filter(objImg => !remainingImages.some((img) => img.url === objImg.url))
        console.log("toDeleteImages are: ",toDeleteImages)

        if (toDeleteImages.length>0) {
            await Promise.all(toDeleteImages?.map(async (imgObj) => await deleteFromCloudinary(imgObj.publicId)));
        }

        product.images = [...remainingImages, ...newImagesArray];

        Object.assign(product, {
            name,
            price,
            stock,
            productDesc,
            subCategory,
            category,
            brandName,
        })

        await product.save();

        return res.status(200).json({
            message: "product updated successfully!",
            product
        })

    } catch (error) {
        console.error("error while editing the product: ", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}


export const getAllProducts = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search;
        const sortBy = parseInt(req.query.sortBy);

        console.log("The page and limits are: ", page, limit);
        let query = {}
        if (search.trim()) {
            query.name = {
                $regex: search.trim(),
                $options: "i"
            }
        }

        let sortValue = {
            createdAt: -1
        }
        if (sortBy !== 0) {
            sortValue = {
                price: sortBy
            }
        }
        const skip = limit * (page - 1);

        const products = await Product.find(query).skip(skip).limit(limit).sort(sortValue);
        const totalPages = Math.ceil(await Product.countDocuments() / limit);
        res.status(200).json({
            products,
            totalPages,
            message: "success",
        })

    } catch (error) {
        console.error("couldn't get products: ", error);
        return res.status(500).json({
            message: "Internal server error, couldn't get products!"
        })
    }
}


export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({
            message: "product not found"
        })
        return res.status(200).json({
            product,
            message: "product fetched successfully!"
        })
    } catch (error) {
        console.log("Internal server error", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({
            message: "product not found!"
        })
        const allImages = product.images;
        await Promise.all(allImages.map(async (image) => {
            if(image.publicId) return await deleteFromCloudinary(image.publicId)
            
        }));
        await product.deleteOne();

        return res.status(200).json({
            message: "product deleted successfully!"
        })
    } catch (error) {
        console.error("Internal server error: ", error);
        return res.status(500).json({
            message: "Internal server error!"
        })
    }
}