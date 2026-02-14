const express = require('express')
const router = express.Router()
const authenticateToken = require('../middleware/authMiddleware.js')
const headingController = require('../controller/headingController.js')

router.post('/', authenticateToken, headingController.createHeading)
router.get('/', authenticateToken, headingController.getHeadings)
router.delete('/:id', authenticateToken, headingController.deleteHeading)

module.exports = router