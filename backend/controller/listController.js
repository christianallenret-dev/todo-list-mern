const ListItem = require('../models/listModel.js')
const Heading = require('../models/headerModel.js')

// ADD ITEM TO A HEADING
exports.addItem = async (req, res) => {
    try {
        // First, verify that the heading exists
        // AND that it belongs to the logged-in user
        const heading = await Heading.findOne({
            _id: req.params.headingId,  // heading ID from URL
            user: req.user.id           // ensure ownership
        })

        // If heading doesn't exist or doesn't belong to user
        if (!heading) {
            return res.status(404).json({ message: "Heading not found" })
        }

        // Create a new list item under that heading
        const item = await ListItem.create({
            user: req.user.id,
            heading: heading._id,
            text: req.body.text
        })

        res.status(201).json(item)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// GET ITEMS FOR A HEADING
exports.getItems = async (req, res) => {
    try {
        // Find all items that:
        // - belong to the given heading
        // - belong to the logged-in user
        const items = await ListItem.find({
            heading: req.params.headingId,
            user: req.user.id
        })

        // Return the list of items
        res.json(items)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// UPDATE ITEM
exports.updateItem = async (req, res) => {
    try {
        // Find item by ID and ensure it belongs to the logged-in user
        const item = await ListItem.findOneAndUpdate(
            {
                _id: req.params.itemId, // item ID from URL
                user: req.user.id       // ownership protection
            },
            req.body,                   // fields to update (e.g., text, completed)
            { new: true }               // return updated document
        )

        // Return updated item
        res.json(item)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// DELETE ITEM
exports.deleteItem = async (req, res) => {
    try {
        // Delete item only if:
        // - ID matches
        // - user owns the item
        await ListItem.findOneAndDelete({
            _id: req.params.itemId,
            user: req.user.id
        })

        res.json({ message: "Item deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
