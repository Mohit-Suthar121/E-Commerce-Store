import { Product } from "../models/Product.model.js";
import { createNewProduct } from "../services/ai.service.js";
import { searchProductImagesSerper } from "../services/serper.service.js";
import { searchProductImages } from "../services/unsplash.service.js";

export const generateProduct = async (req, res) => {
  try {
    const { name, price, stock, category, subCategory, brandName, productDesc } = req.body;
    const addNewProductPrompt = `You are an expert e-commerce product catalog assistant.

You are given a JSON object in the following format:


  "name": "",
  "price": null,
  "stock": null,
  "category": "",
  "subCategory": "",
  "brandName": "",
  "productDesc": ""

  where name:${name},price:${price},stock:${stock},category:${category},subCategory:${subCategory},brandName:${brandName},productDesc:${productDesc}

Your task is to generate a complete product object.

General Rules

1. The product name is mandatory and should be treated as the primary source of information.
2. Use any additional provided fields as hints.
3. Never overwrite a field that already contains a valid value.
4. Only generate values for missing or empty fields.
5. Infer realistic values from the product name whenever possible.
6. Return ONLY valid JSON.
7. Do NOT return markdown.
8. Do NOT return explanations.
9. The response must be directly parsable with JSON.parse().

The output must follow this schema exactly:

{
  "name": "string",
  "price": number,
  "stock": number,
  "category": "Electronics | Fashion | Home & Kitchen | Beauty & Personal Care | Books | Sports & Fitness | Toys & Games | Grocery | Health | Automotive | Jewelry | Pet Supplies | Office Supplies | Footwear | Accessories | Others",
  "subCategory": "string",
  "brandName": "string",
  "productDesc": "string",
  "gstRate":"number",
  "highlights": [
    {
      "title": "string",
      "description": "string"
    }
  ],
  "imageSearchQuery": "string"
}

Generation Rules

Name
- Preserve the provided name.
- Only improve capitalization if necessary.

Price
- If provided, keep it.
- Otherwise estimate a realistic current market price in INR.

Stock
- If provided, keep it.
- Otherwise generate a realistic inventory quantity between 20 and 200.

Category
- Must always be one of the allowed categories.
- if it's given then verify if that category matches with the product name, if not ,then change it, for example if a shoe has a catagory of electronics, it ovbiously doesn't suit, so you should change it to other suitable give categories
- Infer it if missing.

SubCategory
- Generate a specific subcategory.

Brand Name
- Preserve if provided.
- Otherwise infer the manufacturer if it is obvious.
- If the brand cannot be determined, use "Generic".

Product Description
Generate a professional e-commerce description.

Requirements:
- 120-180 words.
- Explain what the product is.
- Mention important features.
- Mention benefits.
- Mention intended users.
- Use a professional tone.
- Avoid exaggerated marketing claims.

Highlights
Generate exactly 5 highlights.

Each highlight must contain:

{
  "title": "...",
  "description": "..."
}

Titles should be short (1-3 words).

Examples:
Display
Battery
Material
Comfort
Performance
Storage
Design
Connectivity
Compatibility
Durability

Descriptions should be one concise sentence.

Image Search Query

Generate a highly optimized search query for finding official product images.

Rules:
- Include the brand name whenever available.
- Include the complete product name.
- Include important identifiers such as model number, storage variant, color, edition, or generation if applicable.
- Append terms like "official product", "product image", or "white background" when appropriate to improve image search relevance.
- Do NOT include unnecessary words.
- The query should be concise (5-12 words).
- The goal is to maximize the likelihood of finding clean, high-quality product images from manufacturers or trusted retailers.

Examples:

Apple iPhone 16 Pro Natural Titanium official product

Sony WH-1000XM6 headphones official product

Nike Air Max 270 white background

Samsung Galaxy S25 Ultra Titanium Black official product

Important

Do NOT generate:

- images
- image URLs
- publicId
- MongoDB IDs
- timestamps
- any fields not defined in the schema

Return ONLY the JSON object.`

    const response = await createNewProduct(addNewProductPrompt);
    const product = JSON.parse(response);
    console.log("the response is: ", response)

    const { name: newName, price: newPrice, stock: newStock, category: newCategory, subCategory: newSubCategory, brandName: newBrandName, productDesc: newProductDesc, highlights: newHighlights, imageSearchQuery } = product;

    let productImages = await searchProductImages(imageSearchQuery);
    if (productImages.length == 0) {
      productImages = await searchProductImagesSerper(imageSearchQuery);
    }

    const newProduct = await Product.create({
      name: newName,
      price: newPrice,
      stock: newStock,
      category: newCategory,
      subCategory: newSubCategory,
      brandName: newBrandName,
      productDesc: newProductDesc,
      highlights: newHighlights,
      images: productImages
    })

    console.log("the saved product to the mongoDb is: ", newProduct);
    return res.status(200).json({
      message: "product generated successfully and saved to the mongoDb!",
      newProduct
    })

  } catch (error) {
    console.error("some error occured!", error);
    return res.status(500).json({
      message: "Internal server error!"
    })

  }
}