import { useContext, useEffect } from "react"
import { AuthContext } from "../auth.context"
import { getMe, Login, logout, register } from "../services/auth.api"

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { setUser, setLoading, loading, user } = context

    const handleLogin = async ({ username, email, password }) => {
        setLoading(true)
        const data = await Login({ username, email, password })
        setUser(data.data)
        setLoading(false)
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        const data = await register({ username, email, password })
        setUser(data.data)
        setLoading(false)
    }
    const handleGetMe = async () => {
        setLoading(true)
        const data = await getMe()
        setUser(data.data)
        setLoading(false)
    }
    const handleLogout = async () => {
        setLoading(true)
        const data = await logout()
        setUser(null)
        setLoading(false)
    }
    useEffect(() => {
        handleGetMe()
    }, [setUser])
    return ({
        handleRegister, handleLogin, handleGetMe, handleLogout, user, loading
    })


}
