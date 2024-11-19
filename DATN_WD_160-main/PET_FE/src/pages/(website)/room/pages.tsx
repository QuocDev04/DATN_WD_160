import { useEffect } from "react"
import RoomPages from "./_component/roompages"

const Room = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <>
            <RoomPages />
        </>
    )
}
export default Room