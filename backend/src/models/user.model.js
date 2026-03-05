const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,  // converts to lowercase
        trim: true,       // removes leading & trailing spaces
        set: v => v.replace(/\s+/g, "") // removes ALL spaces
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        set: v => v.replace(/\s+/g, "")
    },
    refreshToken: {
        type: String,
        select: false

    },
    password: {
        type: String,
        required: true,

    },
}, { timestamps: true });

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10);


})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)

}

userSchema.methods.genrateAccessToken = async function () {
    return jwt.sign({
        _id: this.id,
        username: this.username
    }, process.env.ACCESS_TOKEN, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE })
}

userSchema.methods.genrateRefreshToken = async function () {
    return jwt.sign({ _id: this.id }, process.env.REFRESH_TOKEN, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE })
}

const userModel = mongoose.model("users", userSchema)

module.exports = userModel