import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose, { connect } from 'mongoose';
import { connectDb } from './config/connectDb.js';
import { authRoute } from './routes/auth.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;
connectDb();
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}));
app.use(express.json());
app.use('/api/auth',authRoute)
app.use(cookieParser())

app.get('/', (req, res) => {
    console.log("We've just hit a get request") 
    res.send("hello world")
})

app.listen(port,(req,res)=>{
    console.log("the app is listening on the port: ",port)
})

