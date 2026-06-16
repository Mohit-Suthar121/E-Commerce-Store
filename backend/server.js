import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
const app = express();
const port = 3000;
console.log("MONGO_URI:", process.env.MONGO_URI) 
app.use(cors())


app.get('/', (req, res) => {
    console.log("We've just hit a get request") 
    res.json({
        name: "rohan das",
        age: 23
    })
})


const startServer = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing from your enviorment variables")
        } 
        await mongoose.connect(process.env.MONGO_URI);
        console.log("the connection with the database has been successfull!!")

        app.listen(port, () => {
            console.log("Example app listening on port: localhost:", port)
        })

    } catch (error) {
        console.error("Internal Server Error: ", error) 
    } 
}

startServer();