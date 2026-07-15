import { User } from "../../models/User.js";

export const getUsers = async (req, res) => {
    try {
        const userId = req.userId;
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const search = req.query.search;
        const skip = limit * (page - 1);
        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);

        const query = {
            _id:{
                $ne:userId
            }
        }
        if(search.trim()){
            query.name = {
                $regex:search.trim(),
                $options:"i"
            }
        }

        const users = await User.find(query).limit(limit).skip(skip);
        return res.status(200).json({
            message: "users fetched successfully!",
            totalPages,
            totalUsers,
            users
        })
        
    } catch (error) {
        console.error("Internal server error", error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}