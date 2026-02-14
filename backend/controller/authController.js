const User = require('../models/userModel.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const RefreshToken = require('../models/RefreshToken.js')

let refreshTokens = []

// REGISTER
exports.register = async (req, res) => {
    try {
        // Extract username and password from request body
        const { username, password } = req.body

        // Check if a user with this username already exists
        const userExists = await User.findOne({ username })
        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        // Hash the password before storing it
        // 10 = salt rounds (cost factor)
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create new user with hashed password
        const user = await User.create({
            username,
            password: hashedPassword
        })

        res.status(201).json({ message: "User registered" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// LOGIN
exports.login = async (req, res) => {
    try {
        // Extract credentials from request
        const { username, password } = req.body

        // Find user by username
        const user = await User.findOne({ username })
        if (!user) return res.status(400).json({ message: "Invalid credentials" })

        // Compare entered password with hashed password in database
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return res.status(400).json({ message: "Invalid credentials" })

        // Create Access Token (short-lived)
        const accessToken = jwt.sign(
            { id: user._id, username: user.username },  // payload
            process.env.ACCESS_TOKEN_SECRET,            // secret key
            { expiresIn: '15m' }                        // expires in 15 minutes
        )

        // Create Refresh Token (long-lived)
        const refreshToken = jwt.sign(
            { id: user._id, username: user.username },
            process.env.REFRESH_TOKEN_SECRET
        )

        // Hash refresh token before saving
        const hashedToken = crypto
            .createHash('sha216')
            .update(refreshToken)
            .digest('hex')
        
        // Save hashed token in DB
        await RefreshToken.create({
            user: user._id,
            token: hashedToken,
            expiresIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        })

        res.json({accessToken, refreshToken})

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// REFRESH TOKEN
exports.refresh = async (req, res) => {
    const refreshToken = req.body.token
    if (!refreshToken) return res.sendStatus(401)

    try {
        // Verify refresh token
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        // Hash the incoming token
        const hashedToken = crypto
            .createHash('sha256')
            .update(refreshToken)
            .digest('hex')

        // Check if token exists in DB
        const storedToken = await RefreshToken.findOne({
            user: decoded.id,
            token: hashedToken
        })

        if (!storedToken) return res.sendStatus(403)

        // Generate new access token
        const accessToken = jwt.sign(
            { id: decoded.id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )

        res.json({ accessToken })

    } catch (error) {
        return res.sendStatus(403)
    }
}


// LOGOUT
exports.logout = async (req, res) => {
    const refreshToken = req.body.token
    if (!refreshToken) return res.sendStatus(400)

    const hashedToken = crypto
        .createHash('sha256')
        .update(refreshToken)
        .digest('hex')

    await RefreshToken.deleteOne({ token: hashedToken })

    res.sendStatus(204)
}

