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
            folder: "/moodify/songs"
        }),
        storageService.uploadFile({
            buffer: tags?.image?.imageBuffer,
            fileName: tags.title + ".jpeg",
            folder: "/moodify/posters"
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

const getSong = async (req, res) => {
    const { mood } = req.query

    const count = await songModel.countDocuments({ mood });
    const random = Math.floor(Math.random() * count);
    const song = await songModel.findOne({ mood }).skip(random)
    return res
        .status(200)
        .json(new ApiResponce(200, `song based on ${mood}`, song))
}

module.exports = {
    uploadSongController,
    getSong
}