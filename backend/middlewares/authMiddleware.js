import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const isAuthenticated = async (req, res, next) => {
    try {

        const token = req.cookies.token // this gets parsed because we've used the cookie-parser middleware in index.js
        if (!token) {
            return res.status(401).json({message: "No Token Found"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId)
        if (!user) {
            return res.status(404).json({message: "User Not Found"})
        }

        req.user = user 

        next()

    }catch (err) {
        return res.status(500).json({message: "Server Error"})
    }
}

export default isAuthenticated