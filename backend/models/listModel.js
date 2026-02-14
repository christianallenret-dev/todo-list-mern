const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    heading: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Heading",
        required: true,
    },

    text: {
        type: String,
        required: true,
    },

    completed: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true})

module.exports = mongoose.model("ListItem", listSchema);