import jwt from 'jsonwebtoken'


export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) return res.status(401).json({
            message: "Please enter auth token",
            status: "failed"
        })
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();

    } catch (error) {
        console.error(error);
        return res.status(401).json({
            message: "invalid or expired token",
            status: "failed"
        })
    }

}





