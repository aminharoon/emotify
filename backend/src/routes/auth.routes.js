const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/auth.controller")
const { authUser } = require("../middleware/auth.middelware")

authRouter.post("/register", authController.registerController)
authRouter.post("/login", authController.loginController)

authRouter.get("/get-me", authUser, authController.getMeController)

authRouter.get("/logout", authUser, authController.logoutController)


module.exports = authRouter
