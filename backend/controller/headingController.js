const Heading = require('../models/headerModel.js')

// CREATE HEADING
exports.createHeading = async (req, res) => {
    // Create a new document in the Heading collection
    // user: comes from req.user.id (set by your JWT authentication middleware)
    // title: comes from the request body (client sends it)
    try {
        const heading = await Heading.create({
            user: req.user.id,      // Associate heading with logged-in user
            title: req.body.title   // Title sent from frontend
        })

        // Send back the newly created heading with HTTP status 201 (Created)
        res.status(201).json(heading)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// GET USER HEADINGS
exports.getHeadings = async (req, res) => {
    try {
        // Find all headings where the "user" field matches the logged-in user's ID
        // Ensures users only see their own data
        const headings = await Heading.find({ user: req.user.id })

        // Return the list of headings as JSON
        res.json(headings)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// DELETE HEADING
exports.deleteHeading = async (req, res) => {
    try {
        // Find and delete a heading that:
        // 1. Matches the ID from the URL parameter
        // 2. Belongs to the logged-in user
        // This prevents users from deleting other users' data
        await Heading.findOneAndDelete({
            _id: req.params.id,     // Heading ID from URL
            user: req.user.id       // Must match logged-in user
        })

        res.json({ message: "Heading deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
