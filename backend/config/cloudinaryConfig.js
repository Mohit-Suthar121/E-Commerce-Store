import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

console.log(process.env.CLOUDINARY_CLOUD_NAME)
console.log(process.env.CLOUDINARY_API_KEY)
console.log(process.env.CLOUDINARY_API_SECRET)
console.log(cloudinary.config());

export const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const uploadResponse = cloudinary.uploader.upload_stream(
            {
                folder: 'shortcart_images',
                transformation: [{ width: 400, height: 400, crop: 'fill', gravity: 'face' }]
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result)
            }
        )

        uploadResponse.end(file.buffer);


    })

}

export const deleteFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        throw error
    }
}