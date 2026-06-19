import mongoose from "mongoose";

export const connectDb = async ()=>{
    try {
        if(!process.env.MONGO_URI) throw new Error("Mongo uri is missing from your environment variable");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("The connnection with mongoDb has been successful with the database:",mongoose.connection.name)

    } catch (error) {
        console.error("Database connection failed: ",error.message);
        process.exit(1);
    }
}


