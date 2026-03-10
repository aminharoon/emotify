const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
    songUrl: {
        type: string,
        require: true
    },
    posterUrl: {
        type: String,
        required: true
    },

    tittle: {
        type: String,
        required: true
    }
})

const songModel = mongoose.model("songs", songSchema)

module.exports = songModel