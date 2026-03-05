const blackListModel = require("../models/blacklist.model")
const userModel = require("../models/user.model")
const ApiError = require("../utils/ApiError")
const ApiResponse = require("../utils/ApiResponce")

const genrateAccessAndRefreshToken = async (userID) => {
    try {
        const user = await userModel.findById(userID)
        const AccessToken = await user.genrateAccessToken()
        const RefreshToken = await user.genrateRefreshToken()

        user.refreshToken = RefreshToken
        await user.save({ validateBeforeSave: false });

        return { AccessToken, RefreshToken }
    } catch (e) {
        console.error("something went wrong while genrating the accessand refresh token " + e.message)

    }
}

async function registerController(req, res) {
    try {
        const { username, email, password } = req.body
        const isalready = await userModel.findOne({
            $or: [{ username }, { email }]
        })
        if (isalready) {
            throw new ApiError(400, "user is already exists ")
        }
        const user = await userModel.create({ username, password, email })

        const loggedUser = await userModel.findById(user._id).select("-password -refreshToken")
        return res.
            status(201)
            .json(new ApiResponse(201, "Account created! Please login", loggedUser))

    } catch (e) {
        throw new ApiError(500, `something went wrong while register the user  ${e.message}`)

    }
}

async function loginController(req, res) {
    try {
        const { username, email, password } = req.body
        // .some()
        if (!password || (!username && !email)) {       // ✅ fixed validation
            throw new ApiError(400, "All fields are required")
        }
        const user = await userModel.findOne(
            {
                $or: [{ username: username }, { email: email }]
            }
        ).select("+password")
        if (!user) {
            throw new ApiError(400, "invalid credentials ")
        }
        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid) {
            throw new ApiError(400, "invalid credentials")
        }
        const { AccessToken, RefreshToken } = await genrateAccessAndRefreshToken(user._id)
        const loggedUser = await userModel.findOne({ username }).select('-password -refreshToken')
        const options = {
            httpOnly: true,
            secure: true
        }
        return res
            .status(200)
            .cookie("AccessToken", AccessToken, options)
            .cookie("RefreshToken", RefreshToken, options)
            .json(new ApiResponse(200, "user logged successfully ", loggedUser))

    } catch (e) {
        throw new ApiError(500, `something went wrong while login ${e.message}`)

    }
}
async function getMeController(req, res) {
    try {

        const userID = req.user._id
        const user = await userModel.findById(userID).select("-password -refreshToken")

        return res.status(200)
            .json(new ApiResponse(200, "user fetched successfully ", user))

    } catch (e) {
        throw new ApiError(400, "something went wrong while get profile " + e.message)

    }

}

async function logoutController(req, res) {
    const token = req.cookies.AccessToken
    await userModel.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } })
    await blackListModel.create({
        AccessToken: token
    })
    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .clearCookie("AccessToken", options)
        .clearCookie("RefreshToken", options)
        .json(new ApiResponse(200, "user logout successfully"))
}
module.exports = {
    registerController,
    loginController,
    getMeController,
    logoutController

}