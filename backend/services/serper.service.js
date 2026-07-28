import axios from "axios";



export const searchProductImagesSerper = async (query) => {

    const {data} = await axios.post(
        "https://google.serper.dev/images",
        {
            q: query,
            num:5
        },
        {
            headers: {
                "X-API-KEY": process.env.SERPER_API_KEY,
                "Content-Type": "application/json"
            }
        }
    );

    console.log("the serper ai images are: ",data.images);

    return data.images.map((img)=>(
        {
            url:img.imageUrl,
            publicId:null
        }))

}