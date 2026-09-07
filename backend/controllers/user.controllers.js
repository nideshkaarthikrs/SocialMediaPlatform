import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import genToken from "../utils/genToken.js";

const cookieOptions = {
    httpOnly: true,
    // we've gotta avoid XSS and CSRF attacks
    
}

export const registerUser = async (req, res) => {

    // validations

    try {

        const {name, username, email, password} = req.body
        // All fields required
        if (!name || !username || !password || !email) {
            return res.status(422).json({message : "All fields required"})
        }
        // Username should be unique
        const user = await User.findOne({username}) 
        if (user) {
            return res.status(400).json({message : "username already exists"})
        }
        // Email should be unique
        const emailExists = await User.findOne({email}) 
        if (emailExists) {
            return res.status(400).json({message : "email already exists"})
        }
        // Password validation
        if (password.length<=6) {
            return res.status(400).json({message : "password length should be greater than or equal to 6"})
        }

        // Hashing the password
        const hashedPassword = bcrypt.hashSync(password, 10)

        // Creating user
        const newUser = await User.create({name, username, email, password: hashedPassword})

        // Generating JWT
        const token = genToken(newUser._id)

        res.cookie("token", token, cookieOptions)
        res.status(201).json(newUser)

    }catch (err){
        res.status(500).json({"message": "Internal Server Error"})
    }

}

export const loginUser = async (req, res) => {    
    try {
        const {email, password} = req.body 
        if (!email || !password) {
            return res.status(422).json({message : "All fields required"})
        }
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }
        const correctPassword = bcrypt.compareSync(password, user.password)
        if (!correctPassword) {
            return res.status(401).json({message: "Invalid Credentials"})
        }
        // Generating JWT
        const token = genToken(user._id)
        res.cookie("token", token, cookieOptions)

        res.status(201).json({
            message: "Login successful",
            user: user
        })
    }catch (err){
        res.status(500).json({"message": "Internal Server Error"})
    }

}

export const getUser = (req, res) => {
    return res.status(200).json(req.user)
}

export const logoutUser = (req, res) => {
    res.clearCookie("token", cookieOptions)
    return res.status(200).json({ message: "Logout successful" })
}

export const getUserProfile = async (req, res) => {
    try {
        const { username } = req.params

        const userData = await User.findOne({ username }).select("-password")

        if (!userData) {
            return res.status(404).json({message: "User not found"})
        }

        res.status(200).json({message: "User profile fetched successfully", user: userData})

    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const followUser = async (req, res) => {
    try {
        const currentUserId = req.user._id.toString()
        const targetUserId = req.params.id.toString()
        const targetUser = await User.findById(targetUserId)

        if (!targetUser) {
            return res.status(404).json({
                message: " Target user not found!"
            })
        }

        // Check if the id is same as the logged in user
             // ---> The user cannot follow themselves
        if (currentUserId === targetUserId) {
            return res.status(409).json({
                message: "You cannot follow yourself!"
            })
        }

        const alreadyFollowing = targetUser.followers.some((id) => {
            return id.toString() === currentUserId
        })
        // Check if you are already following the user
             // ---> There should be an option to unfollow
        if (alreadyFollowing) {
            return res.status(409).json({
                message: "You are already following this user!"
            })
        }
        await User.findByIdAndUpdate(currentUserId, {
            $addToSet: { followings: targetUserId }
        })
        await User.findByIdAndUpdate(targetUserId, {
            $addToSet: { followers: currentUserId }
        })

        return res.status(201).json({
            message: "User Followed"
        })
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const unfollowUser = async (req, res) => {
    try {
        const currentUserId = req.user._id.toString()
        const targetUserId = req.params.id.toString()

        if (currentUserId === targetUserId) {
            return res.status(409).json({
                message: "You cannot unfollow yourself!"
            })
        }

        const targetUser = await User.findById(targetUserId)

        if (!targetUser) {
            return res.status(404).json({
                message: "Target user not found!"
            })
        }

        await User.findByIdAndUpdate(currentUserId, {
            $pull: { followings: targetUserId }
        })
        await User.findByIdAndUpdate(targetUserId, {
            $pull: { followers: currentUserId }
        })

        return res.status(200).json({
            message: "User Unfollowed"
        })
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}