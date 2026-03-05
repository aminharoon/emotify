const mongoose = require("mongoose")

const blacklistSchema = new mongoose.Schema({
    AccessToken: {
        type: String,
        required: [true, "Access token is required for black listing "],
        unique: true

    }

}, { timestamps: true })

const blackListModel = mongoose.model("blacklist", blacklistSchema)

module.exports = blackListModel