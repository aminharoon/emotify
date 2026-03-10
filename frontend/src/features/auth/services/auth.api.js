
import axios from "axios"
const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

export const Login = async ({ username, email, password }) => {
    try {
        const res = await api.post("/login", {
            username, email, password
        })
        return res.data

    } catch (e) {
        console.error("something went wrong while login ", e.message)

    }

}
export const register = async ({ username, email, password }) => {
    try {
        const res = await api.post("/register", {
            username, email, password
        })
        return res.data

    } catch (e) {
        console.error("something went wrong while registration ", e.message)

    }

}

export const getMe = async () => {
    try {
        const res = await api.get("/get-me")
        return res.data
    } catch (e) {
        console.log("something went wrong while fetching the user ", e.message)

    }
}
export const logout = async () => {
    try {
        const res = await api.get("/logout")
        return res.data

    } catch (e) {
        console.log("something went wrong while logout ", e.message)

    }
}