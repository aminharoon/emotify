const mongoose = require("mongoose")
const DB_NAME = require("../constants")

const connectDB = async () => {
    try {
        const res = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
        console.log("connected to the data base")
    } catch (e) {
        console.error("something went wrong while connecting to the data base " + e.message)

    }


}
module.exports = connectDB