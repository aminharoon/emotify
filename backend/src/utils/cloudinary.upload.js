const cloudinary = require('cloudinary').v2
const fs = require("fs");



cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const uploadOnCludnary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const res = await cloudinary.v2.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        fs.unlinkSync(localFilePath)
        console.log("file has been uploaded  ", res.url)
        return res

    } catch (e) {
        fs.unlinkSync(localFilePath)
        console.log("something went wrong while uploadeing the file on the cloudinary ", e.message)

    }

}

module.exports = { uploadOnCludnary }
