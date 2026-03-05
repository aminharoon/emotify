const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const ApiError = require("../utils/ApiError")
const blackListModel = require("../models/blacklist.model")
const redis = require("../config/cache")

async function authUser(req, res, next) {
    const token = req.cookies.AccessToken
    if (!token) {
        throw new ApiError(401, "Please login")
    }
    try {
        const isBlackListed = await blackListModel.findOne({ AccessToken: token })
        if (isBlackListed) {
            throw new ApiError(401, "session expired, please login again")
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
        req.user = decoded
        next()
    } catch (e) {
        throw new ApiError(401, "something went wrong while verify the user :-" + e.message)

    }
}
module.exports = { authUser }

