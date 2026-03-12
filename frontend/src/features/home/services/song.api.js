import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/",
    withCredentials: true
})

export const getSong = async ({ mood }) => {
    try {
        const res = await api.get("songs", {
            params: { mood }
        })
        return res.data?.data
    } catch (e) {
        console.log("something went wrong while fetching the song ", e.message)

    }
}

export const uploadSong = async ({ mood, song }) => {
    try {
        const formData = new FormData()
        formData.append("mood", mood)
        formData.append("song", song)

        const res = await api.post("songs", formData)
        return res.data?.data
    } catch (e) {
        console.log("something went wrong while uploading the song", e.message)
        throw e
    }
}