import instance from "@/configs/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import {  useNavigate, useParams } from "react-router-dom";
import MenuRoom from "./menuroom";
import { notification } from "antd";

const RightPagesComponent = () => {
    const userId = localStorage.getItem("userId");
    const { id } = useParams();
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate()
    const { data: room } = useQuery({
        queryKey: ['room', id],
        queryFn: () => instance.get(`/room/${id}`).then(res => res.data),
    });

    const exchangeRate = 1;
    const formatCurrency = (price: number) => {
        const priceInVND = price * exchangeRate;
        return priceInVND.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

    const openNotification = (type: "success" | "error", message: string, description: string) => {
        api.open({
            message,
            description,
            type,
            duration: 3,
            placement: "topRight",
        });
    };

    const { mutate: bookingRoom } = useMutation({
        mutationFn: async (roomId:string) => {
            return instance.post(`/buynow`, { userId, items: [{ roomId }] });
        },
        onSuccess: (data) => {
            const id = data?.data?._id
            navigate(`/BookingRoompages/${userId}/${id}`)
        },
        onError: () => {
            openNotification("error", "Mua hàng thất bại", "Vui Lòng Chọn Size");
        },
    });

    return (
        <>
            {contextHolder}
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">
                <div className="p-8">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-3">{room?.data.roomName}</h1>
                    <p className="text-gray-500 text-sm mb-4">
                        Thương hiệu: <span className="text-gray-600 font-medium">PET HOTEL</span> |
                        Mã sản phẩm: <span className="italic text-gray-500">{room?.data._id}</span>
                    </p>
                    <p className="text-red-600 text-2xl font-extrabold mb-5">{formatCurrency(room?.data.roomprice)}</p>

                    {/* Promotions */}
                    <div className="flex space-x-3 mb-6">
                        <span className="bg-blue-100 text-blue-600 py-2 px-4 rounded-full text-xs font-semibold transform transition duration-300 hover:scale-105">
                            EGA50TH...
                        </span>
                        <span className="bg-yellow-100 text-yellow-600 py-2 px-4 rounded-full text-xs font-semibold transform transition duration-300 hover:scale-105">
                            EGA30TH...
                        </span>
                        <span className="bg-green-100 text-green-600 py-2 px-4 rounded-full text-xs font-semibold transform transition duration-300 hover:scale-105">
                            FREESHIP...
                        </span>
                    </div>

                    {/* Amenities */}
                    <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Tiện Nghi</h3>
                        <ul className="list-disc list-inside text-gray-700 text-sm">
                            <li>Chỗ ở rộng rãi, thoáng mát cho thú cưng</li>
                            <li>Cung cấp đồ chơi và giường ngủ thoải mái</li>
                            <li>Chế độ chăm sóc đặc biệt 24/7</li>
                            <li>Tiện ích Wi-Fi miễn phí cho khách hàng</li>
                        </ul>
                    </div>

                    {/* Pet Care Service Description */}
                    <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
                        <div className="flex flex-col gap-y-6">
                            {/* Pet Care Service */}
                            <div className="flex gap-x-4 items-start hover:bg-gray-100 p-3 rounded-xl transition-all duration-300">
                                <img className="w-10 h-10 object-cover rounded-full" src="../Images/colorfilter.png" alt="Dịch Vụ Chăm Sóc" />
                                <div className="flex flex-col">
                                    <span className="text-[#717378] text-xs tracking-[1px]">DỊCH VỤ CHĂM SÓC</span>
                                    <span className="text-[#060709] text-sm">
                                        Chăm sóc thú cưng toàn diện với các dịch vụ ăn uống, giám sát, tắm rửa, và các hoạt động vui chơi.
                                    </span>
                                </div>
                            </div>

                            {/* Stress Relief */}
                            <div className="flex gap-x-4 items-start hover:bg-gray-100 p-3 rounded-xl transition-all duration-300">
                                <img className="w-10 h-10 object-cover rounded-full" src="../Images/relieve.png" alt="Giảm Căng Thẳng" />
                                <div className="flex flex-col">
                                    <span className="text-[#717378] text-xs tracking-[1px]">CÓ THỂ GIÚP</span>
                                    <span className="text-[#060709] text-sm">
                                        Giảm căng thẳng, mệt mỏi, cải thiện tâm trạng, tăng cường sức khỏe và hỗ trợ phục hồi sau chấn thương.
                                    </span>
                                </div>
                            </div>

                            {/* Health Service */}
                            <div className="flex gap-x-4 items-start hover:bg-gray-100 p-3 rounded-xl transition-all duration-300">
                                <img className="w-10 h-10 object-cover rounded-full" src="../Images/asromas.png" alt="Chăm Sóc Sức Khỏe" />
                                <div className="flex flex-col">
                                    <span className="text-[#717378] text-xs tracking-[1px]">DỊCH VỤ SỨC KHỎE</span>
                                    <span className="text-[#060709] text-sm">
                                        Dịch vụ chăm sóc sức khỏe bao gồm các liệu pháp tắm, massage và kiểm tra sức khỏe định kỳ.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Button */}
                    <button
                        onClick={() => id && bookingRoom(id)} // Chỉ gọi `bookingRoom` nếu `id` tồn tại
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xl font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 mb-6"
                    >
                        Đặt Phòng
                    </button>

                    {/* MenuRoom */}
                    <div className="mt-8">
                        <MenuRoom />
                    </div>
                </div>
            </div>
        </>
    );
};

export default RightPagesComponent;
