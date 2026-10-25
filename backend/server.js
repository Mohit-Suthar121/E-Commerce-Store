import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose, { connect } from 'mongoose';
import { connectDb } from './config/connectDb.js';
import { authRoute } from './routes/auth.js';
import cookieParser from 'cookie-parser';
import { userRoute } from './routes/user.route.js';
import adminProductRoute from './routes/admin/product.route.js';
import adminUserRoute from './routes/admin/user.route.js'
import { authMiddleware } from './middlewares/auth.middleware.js';
import productRoute from './routes/product.route.js';
import { aiRoute } from './routes/ai.route.js';
import { cartRoute } from './routes/cart.route.js';
import { paymentRoute } from './routes/payment.route.js';
import { orderRoute } from './routes/admin/order.route.js';
const app = express();
const port = 3000;
connectDb();

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://e-commerce-store-eight-wine.vercel.app',
    'https://e-commerce-store-qa8d.onrender.com' 
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
app.use(cookieParser());
app.use('/api/auth',authRoute);
app.use('/api/v1/user',userRoute);
app.use('/api/v1/admin/product',adminProductRoute);
app.use('/api/v1/admin/users',adminUserRoute);
app.use('/api/v1/admin/ai',aiRoute);
app.use('/api/v1/product',productRoute);
app.use('/api/v1/cart',cartRoute);
app.use('/api/v1/payment',paymentRoute)
app.use('/api/v1/admin/order',orderRoute)




app.get('/', (req, res) => {
    console.log("We've just hit a get request") 
    res.send("hello world")
})

app.listen(port,(req,res)=>{
    console.log("the app is listening on the port: ",port)
})

