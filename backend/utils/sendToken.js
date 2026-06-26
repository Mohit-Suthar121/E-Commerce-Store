import jwt from 'jsonwebtoken'

export const sendToken = (user,statusCode,res)=>{

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})

    const cookieOptions = {
        expires:new Date(Date.now()+parseInt(process.env.JWT_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        httpOnly:true,
        sameSite:'none',
        secure:process.env.NODE_ENV==='production',
    }

    user.password = undefined;

    res.status(statusCode).cookie('token',token,cookieOptions).json({
        success:true,
        token,
        user,
    })

}

