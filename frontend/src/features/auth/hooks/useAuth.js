import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { getMe, Login, logout, register } from "../services/auth.api"

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { setUser, setLoading, loading } = context

    const handleLogin = async ({ username, email, password }) => {
        setLoading(true)
        const data = await Login({ username, email, password })
        setUser(data.user)
        setLoading(false)
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        const data = await register({ username, email, password })
        setUser(data.user)
        setLoading(false)
    }
    const handleGetMe = async () => {
        setLoading(true)
        const data = await getMe()
        setUser(data.user)
        setLoading(false)
    }
    const handleLogout = async () => {
        setLoading(true)
        const data = await logout()
        setUser(data.user)
        setLoading(false)
    }
    return ({
        handleRegister, handleLogin, handleGetMe, handleLogout
    })


}
