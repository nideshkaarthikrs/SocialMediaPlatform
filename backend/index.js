import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

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

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})