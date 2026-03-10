const express = require("express")

const songRoute = express.Router()

songRoute.get("/get", (req, res) => {
    return res.send("Hello this is song route ")
})


module.exports = songRoute
