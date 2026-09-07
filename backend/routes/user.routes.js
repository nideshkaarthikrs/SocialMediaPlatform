import express from 'express';
import { getUser, loginUser, logoutUser, registerUser, getUserProfile, followUser, unfollowUser } from '../controllers/user.controllers.js';
import dotenv from 'dotenv'
import isAuthenticated from '../middlewares/authMiddleware.js';

dotenv.config()

const userRoutes = express.Router()

// Register User
userRoutes.post('/register',registerUser)

// Login User
userRoutes.post('/login',loginUser)

// JWT Verification route
userRoutes.get('/me', isAuthenticated, getUser)

// Logout User
userRoutes.post('/logout', isAuthenticated, logoutUser)

// Getting User Profiles
userRoutes.get('/profile/:username', isAuthenticated, getUserProfile)

// Following and Followers
userRoutes.post('/:id/follow', isAuthenticated, followUser)

// Unfollow user
userRoutes.post('/:id/unfollow', isAuthenticated, unfollowUser)

export default userRoutes