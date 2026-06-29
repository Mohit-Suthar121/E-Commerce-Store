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

export const uploadToCloudinary = async (file) => {
    console.log("The cloudinary has got the file as: ",file)
    try {
        console.log("before base64")
        const fileBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        console.log("after base64")
        const uploadResponse = await cloudinary.uploader.upload(fileBase64, {
            folder: 'shortcart_avatars',
            transformation: [{ width: 400, height: 400, crop: 'fill', gravity: 'face' }]
        })
        console.log("The cloudinary uploadResponse: ",uploadResponse)
        return uploadResponse;
    } catch (error) {
        throw error
    }
}