import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose, { connect } from 'mongoose';
import { connectDb } from './config/connectDb.js';
import { authRoute } from './routes/auth.js';
import cookieParser from 'cookie-parser';
import { userRoute } from './routes/user.route.js';

const app = express();
const port = 3000;
connectDb();

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://e-commerce-store-eight-wine.vercel.app' 
];
app.use(cors({
    origin:function(origin,callback){
        if (!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin)===-1){
            return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
        }
        return callback(null, true);
    },
    credentials:true
}));

app.use(express.json());
app.use(cookieParser())
app.use('/api/auth',authRoute)
app.use('/api/v1/user',userRoute)


app.get('/', (req, res) => {
    console.log("We've just hit a get request") 
    res.send("hello world")
})

app.listen(port,(req,res)=>{
    console.log("the app is listening on the port: ",port)
})

