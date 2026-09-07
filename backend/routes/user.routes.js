import express from 'express';
import { getUser, loginUser, logoutUser, registerUser, getUserProfile } from '../controllers/user.controllers.js';
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

userRoutes.post('/logout', logoutUser)

userRoutes.get('/profile/:username', getUserProfile)

export default userRoutes