
import { useContext } from "react"
import { getSong } from "../services/song.api"
import { SongContext } from "../songContext"



export const useSong = () => {
    const context = useContext(SongContext)
    const { song, setSong, loading, setLoading } = context

    const handleGetSong = async ({ mood }) => {
        setLoading(true)
        const res = await getSong({ mood })
        setSong(res)
        setLoading(false)

    }
    return { loading, song, handleGetSong }
}
