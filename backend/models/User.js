import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A username is strictly required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "A email is strictly reqired"],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email structure']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must consist of at least 6 characters"],
        select: false
    },
    phoneNo:{
        type:String,
        trim:true,
        default:""
    },
    shippingAddress:{
        street:{
            type:String,
            trim:true,
            default:""
        },
        city:{
            type:String,
            trim:true,
            default:""
        },
        zipCode:{
            type:String,
            trim:true,
            default:""
        }
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    otpCode: {
        type: String,
        default: null,
        select:false
    },
    otpExpires: {
        type: Date,
        default: null,
        select:false
    }

}, { timestamps: true })


userSchema.pre('save', async function(){
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

})

userSchema.methods.verifyPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

export const User = mongoose.model('User', userSchema);





