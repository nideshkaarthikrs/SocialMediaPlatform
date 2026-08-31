import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const PORT = 8010

const app = express()

mongoose.connect(process.env.DB_URL)
.then(() => {
    console.log("DB Connected")
})
.catch((err) => {
    console.log(`Error: ${err}`)
})

// Middlewares
app.use(express.json())
app.use(cookieParser()) // in order for js to be able to parse cookies

app.use("/users", userRoutes)

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})