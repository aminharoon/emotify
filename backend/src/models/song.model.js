const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    songUrl: {
        type: String,
        require: true
    },
    posterUrl: {
        type: String,
        default: "https://ik.imagekit.io/se7odunboq/profile-placeholder-image-gray-silhouette-no-photo-profile-placeholder-image-gray-silhouette-no-photo-person-avatar-123478438.webp?updatedAt=1772272652690"
    },

    tittle: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        enum: {
            values: ["sad", "happy", "surprised"]
        }
    }
})

const songModel = mongoose.model("songs", songSchema)

module.exports = songModel