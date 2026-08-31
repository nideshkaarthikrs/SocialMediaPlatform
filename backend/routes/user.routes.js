import express from 'express';
import { getUser, loginUser, registerUser } from '../controllers/user.controllers.js';
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



export default userRoutes