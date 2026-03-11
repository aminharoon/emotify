const songModel = require("../models/song.model")
const ApiError = require("../utils/ApiError")
const ApiResponce = require("../utils/ApiResponce")

const id3 = require("node-id3")
const storageService = require("../services/storage.services")

const uploadSongController = async (req, res) => {
    const { mood } = req.body
    const songBuffer = req.file.buffer
    const tags = id3.read(songBuffer)
    console.log()

    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            fileName: tags.title + ".mp3",
            folder: "/cohort-2/moodify/songs"
        }),
        storageService.uploadFile({
            buffer: tags?.image?.imageBuffer,
            fileName: tags.title + ".jpeg",
            folder: "/cohort-2/moodify/posters"
        })
    ])
    const song = await songModel.create({
        tittle: tags.title,
        songUrl: songFile.url,
        posterUrl: posterFile.url,
        mood
    })


    return res
        .status(201)
        .json(new ApiResponce(201, "song is created ", song))


}

module.exports = {
    uploadSongController
}