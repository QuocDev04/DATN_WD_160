import instance from "@/configs/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import {  useNavigate, useParams } from "react-router-dom";
import MenuRoom from "./menuroom";
import { MdPets, MdSpa, MdShower, MdCleaningServices } from 'react-icons/md';
import { message } from 'antd';

const RightPagesComponent = () => {
    const userId = localStorage.getItem("userId");
    const { id } = useParams();
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

    const { mutate: bookingRoom } = useMutation({
        mutationFn: async (roomId:string) => {
            return instance.post(`/buynow`, { userId, items: [{ roomId }] });
        },
        onSuccess: (data) => {
            const id = data?.data?._id
            navigate(`/BookingRoompages/${userId}/${id}`)
        },
    });

    const handleBooking = () => {
        if (!userId) {
            message.warning('Vui lòng đăng nhập để đặt phòng!');
            navigate('/login'); // Chuyển hướng đến trang đăng nhập
            return;
        }
        id && bookingRoom(id);
    };

    return (

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Header Section */}
            <div className="relative p-8 pb-4">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
                    PET HOTEL
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{room?.data.roomName}</h1>
                <div className="flex items-center gap-2 mb-6">
                    <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </span>
                        <span className="text-gray-600">4.9</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">200+ đánh giá</span>
                </div>

                {/* Price Tag */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-red-600">{formatCurrency(room?.data.roomprice)}</span>
                        <span className="text-gray-500 ml-2">/giờ</span>
                    </div>
                    <button
                        onClick={handleBooking}
                        className="px-8 py-3 bg-[#8B4513] text-white font-semibold rounded-xl hover:bg-[#8B4513] transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:ring-offset-2"
                    >
                        {userId ? 'Đặt Phòng Ngay' : 'Đặt Phòng'}
                    </button>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-gray-700">Phòng rộng rãi</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-gray-700">Chăm sóc 24/7</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <MdCleaningServices className="w-8 h-8 text-blue-500" />
                        <span className="text-gray-700">Vệ sinh sạch sẽ</span>
                    </div>
                </div>

                {/* Services Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-900">Dịch Vụ Đi Kèm</h2>
                    <div className="grid gap-6">
                        <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <MdPets className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Dịch Vụ Chăm Sóc Toàn Diện</h3>
                                <p className="text-gray-600 mt-1">
                                    Chăm sóc thú cưng chuyên nghiệp với các dịch vụ ăn uống, giám sát, tắm rửa, và các hoạt động vui chơi.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                            <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <MdSpa className="w-8 h-8 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Liệu Pháp Thư Giãn</h3>
                                <p className="text-gray-600 mt-1">
                                    Giảm căng thẳng, mệt mỏi và cải thiện tâm trạng cho thú cưng của bạn.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <MdShower className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Dịch Vụ Tắm Rửa</h3>
                                <p className="text-gray-600 mt-1">
                                    Dịch vụ tắm rửa, vệ sinh và làm đẹp chuyên nghiệp cho thú cưng của bạn.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu Room Section */}
                <div className="mt-12">
                    <MenuRoom />
                </div>
            </div>
        </div>
    );
};

export default RightPagesComponent;
