const imageKit = require("@imagekit/nodejs")

const client = new imageKit({
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
})

const uploadFile = async ({ buffer, fileName, folder = "" }) => {
    const file = await client.files.upload({
        file: await imageKit.toFile(Buffer.from(buffer)),
        fileName: fileName,
        folder
    })
    return file

}
module.exports = {
    uploadFile
}