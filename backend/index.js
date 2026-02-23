require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db.js')

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/headings', require('./route/headingRoutes.js'))
app.use('/api/items', require('./route/listRoutes.js'))
app.use('/api/auth', require('./route/authRoute.js'))

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT: ${process.env.PORT}`)
})