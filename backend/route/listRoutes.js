const express = require('express')
const router = express.Router()
const authenticateToken = require('../middleware/authMiddleware.js')
const listController = require('../controller/listController.js')

router.post('/:headingId', authenticateToken, listController.addItem)
router.get('/:headingId', authenticateToken, listController.getItems)
router.put('/:itemId', authenticateToken, listController.updateItem)
router.delete('/:itemId', authenticateToken, listController.deleteItem)

module.exports = router