import { IRoom } from "@/common/type/IRoom"
import { Link } from "react-router-dom"
  type RoomItemProps = {
        room:IRoom
    }
const RoomItem = ({room}: RoomItemProps) => {
    const exchangeRate = 1;
    const formatCurrency = (price: number) => {
        const priceInVND = price * exchangeRate;
        return priceInVND.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };
    
    return (
        <>
            <div className="p-1">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
                    <div className="absolute top-3 right-3">
                        <img src="/logo.png" alt="Logo" className="w-8 h-8" />
                    </div>
                    <img
                        src={room.roomgallely[0]}
                        className="w-full h-64 object-contain p-4"
                    />
                    <div className="p-4 text-center border-t border-gray-200">
                        <h3 className="text-lg font-bold text-gray-800">
                           {room.roomName}
                        </h3>
                        <div className="mt-2">
                            <span className="text-red-600 text-xl font-semibold">
                                {formatCurrency(room.roomprice)}
                            </span>
                        </div>
                        <Link to={`/Roompages/${room._id}`}>
                            <button className="mt-4 w-full rounded-md bg-[#8B4513] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#8B4513]">
                                Đặt Phòng
                            </button>
                        </Link>  
                    </div>
                </div>
            </div>
        </>
    )
}
export default RoomItem