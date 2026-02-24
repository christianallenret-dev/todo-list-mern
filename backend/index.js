require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db.js')

const app = express()

connectDB()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())

app.use('/api/headings', require('./route/headingRoutes.js'))
app.use('/api/items', require('./route/listRoutes.js'))
app.use('/api/auth', require('./route/authRoute.js'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${process.env.PORT}`)
})