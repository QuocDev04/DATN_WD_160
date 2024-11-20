import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";

const Confirmed = () => {
    const { data } = useQuery({
        queryKey: ["bookingroom"],
        queryFn: async () => instance.get(`/bookingroom`)
    });

    // Lọc các đơn có trạng thái pending
    const pendingBookings = data?.data?.filter((item: any) => item.status === "confirmed");

    return (
        <>
            {pendingBookings?.map((item: any) => (
                <div key={item._id} className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="w-full max-w-5xl bg-white border border-gray-200 rounded-lg shadow-md p-8 space-y-6">
                        <h2 className="text-3xl font-bold text-gray-800 text-center">
                            Thông Tin Đặt Phòng
                        </h2>

                        {/* Thông tin khách hàng */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800">Thông tin khách hàng</h3>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Họ và tên:</span>
                                <span className="text-gray-800 font-medium">{item.lastName}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Số điện thoại:</span>
                                <span className="text-gray-800 font-medium">{item.phone}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Email:</span>
                                <span className="text-gray-800 font-medium">{item.gmail}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Thời gian đặt phòng:</span>
                                <span className="text-gray-800 font-medium">{new Date(item.createdAt).toLocaleString("vi-VN")}</span>
                            </div>
                        </div>
                        {/* Thông tin phòng */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800">Chi tiết đặt phòng</h3>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Tên phòng:</span>
                                <span className="text-gray-800 font-medium">{item?.items[0]?.roomId?.roomName}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Ngày nhận phòng:</span>
                                <span className="text-gray-800 font-medium">{new Date(item.checkindate).toLocaleString("vi-VN")}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Ngày trả phòng:</span>
                                <span className="text-gray-800 font-medium">{new Date(item.checkoutdate).toLocaleString("vi-VN")}</span>
                            </div>
                        </div>

                        {/* Tổng tiền */}
                        <div className="border-t pt-4 flex justify-between items-center">
                            <span className="font-medium text-xl text-gray-800">Tổng tiền:</span>
                            <span className="text-green-600 font-bold text-2xl">{item.totalPrice.toLocaleString()} VNĐ</span>
                        </div>

                        {/* Trạng thái */}
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-600">Trạng thái:</span>
                            <span className="text-blue-600 font-bold">
                                {item.status === "confirmed" ? "Đã Thanh Toán" : item.status}
                            </span>

                        </div>

                        {/* Nút thao tác */}
                        <div className="flex space-x-4">
                            <button className="w-1/2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Tải hóa đơn
                            </button>
                            <button className="w-1/2 py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                               Đã Xác Nhận
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Confirmed;
