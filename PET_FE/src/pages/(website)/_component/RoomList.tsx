import { IRoom } from "@/common/type/IRoom"
import RoomItem from "./RoomItem";

type Props = {
    rooms: IRoom[];
}

const RoomList = ({ rooms }: Props) => {
    return (
        <>
            {rooms &&
                rooms.map((room: IRoom) => (
                    <RoomItem key={room._id} room={room} />
                ))
           }
        </>
    )
}
export default RoomList