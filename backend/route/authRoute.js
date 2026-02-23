const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')

// register
router.post('/register', authController.register)

// login
router.post('/login', authController.login)

// Refresh Access Token
router.post('/token', authController.refresh)

// Logout
router.post('/logout', authController.logout)

module.exports = router