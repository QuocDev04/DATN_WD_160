import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification, Modal } from "antd";
import { useState } from "react";

// Thêm constant cho các lý do hủy đơn
const CANCEL_REASONS = [
    { value: "change_schedule", label: "Thay đổi lịch trình" },
    { value: "found_better_option", label: "Tìm được phương án tốt hơn" },
    { value: "price_too_high", label: "Giá cả không phù hợp" },
    { value: "emergency", label: "Có việc khẩn cấp" },
    { value: "other", label: "Lý do khác" }
];

const BillBooking = () => {
    const queryClient = useQueryClient();
    const userId = localStorage.getItem("userId");
    const { data, isLoading, error } = useQuery({
        queryKey: ["bookingroom", userId],
        queryFn: async () => instance.get(`/bookingroom/${userId}`),
    });
    console.log(data?.data);
    
    const [api, contextHolder] = notification.useNotification();
    const openNotification =
        (pauseOnHover: boolean) =>
            (type: "success" | "error", message: string, description: string) => {
                api.open({
                    message,
                    description,
                    type,
                    showProgress: true,
                    pauseOnHover,
                });
            };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState<string>("");
    const [cancelReason, setCancelReason] = useState<string>("");

    const { mutate: patch } = useMutation({
        mutationFn: async ({ bookingId, status, cancelReason }: { bookingId: string, status: string, cancelReason?: string }) => {
            try {
                return await instance.patch(`/bookingroom/${bookingId}/status`, { status, cancelReason });
            } catch (error: any) {  
                throw new Error(error?.response?.data?.message || "Error updating booking status");
            }
        },
        onSuccess: () => {
            openNotification(false)(
                "success",
                "Chuyển Trạng Thái Thành Công",
                "Bạn Chuyển Trạng Thái Thành Công"
            );
            queryClient.invalidateQueries({
                queryKey: ["bookingroom", userId],
            });
        },
        onError: (error: any) => {
            const errorMessage = error.message || "Có lỗi xảy ra. Vui lòng thử lại!";
            openNotification(false)(
                "error",
                "Chuyển Trạng Thái Thất Bại",
                errorMessage
            );
        },
    });

    const handleCancelClick = (bookingId: string) => {
        setSelectedBookingId(bookingId);
        setIsModalOpen(true);
    };

    const handleConfirmCancel = () => {
        if (!cancelReason.trim()) {
            openNotification(false)(
                "error",
                "Lỗi",
                "Vui lòng nhập lý do hủy đơn"
            );
            return;
        }

        patch({
            bookingId: selectedBookingId,
            status: "cancelled",
            cancelReason: cancelReason
        });
        setIsModalOpen(false);
        setCancelReason("");
    };

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error fetching data</div>;

    return (
        <>
            {contextHolder}
            <div className="container mx-auto py-12 px-4 max-w-6xl">
                <h1 className="text-4xl font-bold text-gray-800 text-center mb-12">
                    Lịch Sử Đặt Phòng
                </h1>
                
                <div className="grid grid-cols-1 gap-8">
                    {data?.data?.map((item: any) => (
                        <div key={item._id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
                            {/* Header với gradient */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-100">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                                        </svg>
                                        <h2 className="text-2xl font-semibold text-gray-800">
                                            #{item._id.slice(-6)}
                                        </h2>
                                    </div>
                                    <span className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm ${
                                        item.status === "pending" ? "bg-yellow-50 text-yellow-700 border border-yellow-200" :
                                        item.status === "cancelled" ? "bg-red-50 text-red-700 border border-red-200" :
                                        "bg-green-50 text-green-700 border border-green-200"
                                    }`}>
                                        {item.status === "pending" ? "Chờ Xác Nhận" : 
                                         item.status === "cancelled" ? "Đã Hủy" : item.status === "confirmed" ? "Đã Xác Nhận" : "Đã Hoàn Thành"}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    {/* Thông tin khách hàng */}
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                            </svg>
                                            Thông tin khách hàng
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Họ và tên:</span>
                                                <span className="font-medium text-gray-800">{item.lastName}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Số điện thoại:</span>
                                                <span className="font-medium text-gray-800">{item.phone}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Email:</span>
                                                <span className="font-medium text-gray-800">{item.gmail}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Chi tiết đặt phòng */}
                                    <div className="bg-gray-50 rounded-xl p-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                            </svg>
                                            Chi tiết đặt phòng
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Tên phòng:</span>
                                                <span className="font-medium text-gray-800">{item?.items[0]?.roomId?.roomName}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Nhận phòng:</span>
                                                <span className="font-medium text-gray-800">{new Date(item.checkindate).toLocaleString("vi-VN")}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Trả phòng:</span>
                                                <span className="font-medium text-gray-800">{new Date(item.checkoutdate).toLocaleString("vi-VN")}</span>
                                            </div>
                                            {/* Thêm phần hiển thị lý do hủy */}
                                            {item.status === "cancelled" && item.cancelReason && (
                                                <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-100">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                        </svg>
                                                        <span className="font-medium text-red-700">Lý do hủy đơn:</span>
                                                    </div>
                                                    <p className="text-red-600 ml-7">{item.cancelReason}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer với tổng tiền và nút */}
                                <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                                    {/* Phần tổng tiền */}
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                            <span className="text-xl font-semibold text-gray-800">Tổng tiền:</span>
                                        </div>
                                        <span className="text-2xl font-bold text-green-600">
                                            {item.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </span>
                                    </div>

                                    {/* Button hủy đơn */}
                                    {item.status === "pending" && (
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => handleCancelClick(item._id)}
                                                className="px-6 py-2.5 bg-white border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors duration-200 flex items-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                                Hủy đơn
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                title="Xác nhận hủy đơn"
                open={isModalOpen}
                onOk={handleConfirmCancel}
                onCancel={() => {
                    setIsModalOpen(false);
                    setCancelReason("");
                }}
                okText="Xác nhận"
                cancelText="Hủy"
            >
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lý do hủy đơn *
                    </label>
                    <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                    >
                        <option value="">-- Chọn lý do hủy --</option>
                        {CANCEL_REASONS.map((reason) => (
                            <option key={reason.value} value={reason.label}>
                                {reason.label}
                            </option>
                        ))}
                    </select>
                </div>
            </Modal>
        </>
    );
};

export default BillBooking;
