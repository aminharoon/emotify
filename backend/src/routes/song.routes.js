const express = require("express")
const upload = require("../middleware/upload.middleware")
const songController = require("../controllers/songs.controller")
const songRoute = express.Router()


songRoute.post("/", upload.single("song"), songController.uploadSongController)

songRoute.get("/", songController.getSong)



module.exports = songRoute
