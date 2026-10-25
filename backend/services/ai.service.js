import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
})


export async function createNewProduct(prompt){
    try {
        const response = await ai.models.generateContent({
            model:"models/gemini-3.1-flash-lite",
            contents:prompt,
        })

        console.log("the response from the gemini is:",response);
        return response.text
    } catch (error) {
        console.log("internal server error",error)
    }
}