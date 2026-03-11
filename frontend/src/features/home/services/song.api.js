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