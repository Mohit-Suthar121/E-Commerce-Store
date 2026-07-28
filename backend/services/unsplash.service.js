import axios from "axios";

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;


export const searchProductImages = async (query) => {

    try {
        const { data } = await axios.get("https://api.unsplash.com/search/photos", {
            params: {
                query,
                per_page: 5,
                orientation: "squarish",
            },
            headers: {
                Authorization: `Client-ID ${ACCESS_KEY}`,
            },

        })

        return data.results.map((photo) => ({
            url: photo.urls.regular,
            publicId: null

        }))
    } catch (error) {
        console.error("some error occured!",error?.response || error);
        throw error
    }

}