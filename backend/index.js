import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

const PORT = 8010

const app = express()

// Middlewares
app.use(express.json())
app.use(cookieParser()) // in order for js to be able to parse cookies
app.use(cors({
    origin: "http://localhost:5173", // Allow requests from the client
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed request headers
    credentials: true // Allow cookies, authentication credentials, etc.
})); // Enable Cross-Origin Resource Sharing (CORS)

app.use("/users", userRoutes)

mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log("DB Connected")
    app.listen(PORT, () => {
        console.log(`Server listening at port ${PORT}`)
    })
})
.catch((err) => {
    console.log(`Error: ${err}`)
    process.exit(1)
})