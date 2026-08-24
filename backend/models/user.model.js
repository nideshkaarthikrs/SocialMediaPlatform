import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    userName: {
        type: String, 
        required: true,
        unique: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,
    },
    phone: {
        type: Number, 
    },
    bio: {
        type: String, 
    },
    followers: [
        // User IDs to be stored
    ],
    followings: [
        // User IDs to be stored
    ],
    posts: [
        // Post IDs to be stored
    ],
    stories: [
        // IDs to be stored
    ],
    reels: [
        // IDs to be stored
    ],
    profileImage: {
        type: String // URL will be stored
    }
})

const User = mongoose.model("User", userSchema)

export default User