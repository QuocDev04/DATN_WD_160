import instance from "@/configs/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Image, Input, Modal, notification, Select } from "antd";
import { useState } from "react";
import { VideoCameraOutlined } from "@ant-design/icons";
const CANCEL_REASONS = [
    { value: "change_schedule", label: "Thay đổi lịch trình" },
    { value: "found_better_option", label: "Tìm được phương án tốt hơn" },
    { value: "price_too_high", label: "Giá cả không phù hợp" },
    { value: "emergency", label: "Có việc khẩn cấp" },
    { value: "other", label: "Lý do khác" }
];
const InformationUser = () => {
    const queryClient = useQueryClient();
    const userId = localStorage.getItem("userId");
    
    // Sửa lại cách query và truy cập data
    const { data: bookingData } = useQuery({
        queryKey: ["bookingroom", userId],
        queryFn: async () => {
            const response = await instance.get(`/bookingroom/${userId}`);
            return response.data;
        },
        enabled: !!userId,
    });

    const { data: userData } = useQuery({
        queryKey: ["user", userId],
        queryFn: async () => {
            const response = await instance.get(`/user/${userId}`);
            return response.data;
        },
        enabled: !!userId,
    });

    // Thêm console.log để debug
    console.log('Raw userData:', userData);
    console.log('Raw bookingData:', bookingData);

    // Đảm bảo truy cập đúng cấu trúc data
    const userInfo = userData?.data || userData;
    const bookingInfo = bookingData?.data || bookingData;

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
    const [cancelReasonDetail, setCancelReasonDetail] = useState<string>("");
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);

    const { mutate: patch } = useMutation({
        mutationFn: async (params: { bookingId: string, status: string, cancelReason: string, cancelReasonDetail?: string }) => {
            const response = await instance.patch(`/bookingroom/${params.bookingId}/status`, {
                status: params.status,
                cancelReason: params.cancelReason,
                cancelReasonDetail: params.cancelReasonDetail
            });
            return response.data;
        },
        onSuccess: () => {
            openNotification(false)(
                "success",
                "Hủy đơn thành công",
                "Bạn đã hủy đơn thành công"
            );
            queryClient.invalidateQueries({
                queryKey: ["bookingroom", userId],
            });
            setIsModalOpen(false);
            setCancelReason("");
            setCancelReasonDetail("");
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || "Có lỗi xảy ra khi hủy đơn";
            openNotification(false)(
                "error",
                "Hủy đơn thất bại",
                errorMessage
            );
        },
    });

    const handleCancelClick = (bookingId: string) => {
        setSelectedBookingId(bookingId);
        setIsModalOpen(true);
    };

    const handleConfirmCancel = () => {
        if (!cancelReason) {
            openNotification(false)(
                "error",
                "Lỗi",
                "Vui lòng chọn lý do hủy đơn"
            );
            return;
        }

        if (cancelReason === "other" && !cancelReasonDetail) {
            openNotification(false)(
                "error",
                "Lỗi",
                "Vui lòng nhập chi tiết lý do hủy đơn"
            );
            return;
        }

        patch({
            bookingId: selectedBookingId,
            status: "cancelled",
            cancelReason: cancelReason,
            cancelReasonDetail: cancelReason === "other" ? cancelReasonDetail : undefined
        });
    };

    // Thêm helper function để lấy label từ value của lý do hủy
    const getCancelReasonLabel = (value: string) => {
        const reason = CANCEL_REASONS.find(reason => reason.value === value);
        return reason ? reason.label : value;
    };

    const handleCloseVideoModal = () => {
        setIsVideoModalOpen(false);
        setReloadKey(prev => prev + 1); // Reset iframe khi đóng modal
    };

    // Thêm mutation để cập nhật thông tin user
    const { mutate: updateUser } = useMutation({
        mutationFn: async (data: any) => {
            return await instance.put(`/user/${userId}`, data);
        },
        onSuccess: () => {
            openNotification(false)(
                "success",
                "Cập nhật thành công",
                "Thông tin của bạn đã được cập nhật"
            );
            queryClient.invalidateQueries({ queryKey: ["user", userId] });
        },
        onError: (error: any) => {
            const errorMessage = error?.response?.data?.message || "Có lỗi xảy ra khi cập nhật thông tin";
            openNotification(false)(
                "error",
                "Cập nhật thất bại",
                errorMessage
            );
        },
    });

    // Thêm hàm xử lý submit form
    const handleSubmit = (values: any) => {
        updateUser({
            name: values.name,
            email: values.email,
            phone: values.phone,
        });
    };

    return (
        <>
        {contextHolder}
         <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="container mx-auto py-8 space-y-8">
                {/* Top Profile Card */}
                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="flex items-center p-6">
                        <div className="relative group">
                            <Image
                                src={userInfo?.avatar || '/default-avatar.png'}
                                alt="Avatar"
                                width={80}
                                height={80}
                                className="w-20 h-20 rounded-full border-2 border-gray-200 object-cover shadow-sm transition-transform group-hover:scale-105"
                            />
                            <label htmlFor="avatar-upload"
                                className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md cursor-pointer hover:bg-gray-50 transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </label>
                        </div>
                        <div className="ml-6">
                            <h2 className="text-2xl font-bold text-gray-800">{bookingInfo?.name}</h2>
                            <div className="flex items-center mt-2 text-gray-600">
                                <span className="material-icons-outlined text-sm mr-2">Email: </span>
                                <p>{userInfo?.email}</p>
                            </div>
                        </div>
                        {bookingInfo?.some((booking: any) => booking.status === "completed") && (
                            <div className="relative ml-auto group">
                                <button
                                    onClick={() => setIsVideoModalOpen(true)}
                                    className="
                                        relative
                                        px-4
                                        py-2
                                        text-sm
                                        font-medium
                                        text-white
                                        transition-all
                                        duration-300
                                        ease-in-out
                                        transform
                                        hover:scale-105
                                        hover:shadow-[0_4px_15px_rgba(59,130,246,0.3)]
                                        rounded-lg
                                        overflow-hidden
                                        animate-fadeIn
                                        bg-gradient-to-r
                                        from-[#8B4513]
                                        to-[#d88142]
                                        group
                                    "
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-small"></span>

                                    <div className="relative flex items-center gap-2">
                                        <VideoCameraOutlined className="text-base animate-pulse" />
                                        <span>Theo dõi thú cưng</span>
                                    </div>
                                </button>

                                {/* Tooltip nhỏ gọn */}
                                <div className="
                                    absolute 
                                    -top-10 
                                    left-1/2 
                                    -translate-x-1/2 
                                    bg-gray-800 
                                    text-white 
                                    px-3 
                                    py-1 
                                    rounded 
                                    text-xs
                                    whitespace-nowrap
                                    opacity-0 
                                    group-hover:opacity-100 
                                    transition-opacity 
                                    duration-200
                                    pointer-events-none
                                    z-10
                                ">
                                    Xem trực tiếp
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-4 border-transparent border-t-gray-800"></div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex gap-8">
                    {/* Left Side - User Information */}
                    <div className="w-1/2">
                        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-3">
                                <span className="inline-block border-b-2 border-[#8B4513] pb-3 -mb-3.5">
                                    Thông tin chi tiết
                                </span>
                            </h3>
                            <div className="space-y-6">
                                <div className="transform hover:scale-[1.01] transition-transform duration-200">
                                    <div className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
                                        <div className="p-2 bg-[#8B4513] bg-opacity-10 rounded-full mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#8B4513]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-500">
                                                Họ và tên
                                            </label>
                                            <p className="text-gray-800 font-semibold mt-1">
                                                {userInfo?.name || 'Chưa có thông tin'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="transform hover:scale-[1.01] transition-transform duration-200">
                                    <div className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
                                        <div className="p-2 bg-[#8B4513] bg-opacity-10 rounded-full mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#8B4513]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-500">
                                                Email
                                            </label>
                                            <p className="text-gray-800 font-semibold mt-1">
                                                {userInfo?.email || 'Chưa có thông tin'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="transform hover:scale-[1.01] transition-transform duration-200">
                                    <div className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
                                        <div className="p-2 bg-[#8B4513] bg-opacity-10 rounded-full mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#8B4513]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-500">
                                                Số điện thoại
                                            </label>
                                            <p className="text-gray-800 font-semibold mt-1">
                                                {userInfo?.phone || 'Chưa có thông tin'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="transform hover:scale-[1.01] transition-transform duration-200">
                                    <div className="flex items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
                                        <div className="p-2 bg-[#8B4513] bg-opacity-10 rounded-full mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#8B4513]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-500">
                                                Mật khẩu
                                            </label>
                                            <div className="flex items-center justify-between mt-1">
                                                <p className="text-gray-800 font-semibold">••••••••</p>
                                                <Button 
                                                    type="link" 
                                                    className="text-[#8B4513] hover:text-[#d88142] transition-colors duration-200"
                                                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>}
                                                >
                                                    Đổi mật khẩu
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Booking History */}
                    <div className="w-1/2 bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Lịch sử đặt phòng</h2>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                            {bookingInfo?.map((booking: any) => (
                                <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-lg">Phòng: {booking?.items[0]?.roomId?.roomName}</span>
                                        <span className={`px-3 py-1 rounded-full text-sm ${
                                            booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {booking.status === 'completed' ? 'Hoàn thành' :
                                             booking.status === 'confirmed' ? 'Đã xác nhận' :
                                             booking.status === 'pending' ? 'Đang chờ' : 
                                             'Đã hủy'}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600 space-y-2">
                                        {booking.status === 'confirmed' && (
                                            <div className="text-red-500 font-medium">
                                              Vui lòng mang thú cưng tới trước thời gian đặt phòng và hoàn thành thủ tục thanh toán
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Nhận phòng:</span>
                                            <span className="font-medium text-gray-800">{new Date(booking.checkindate).toLocaleString("vi-VN")}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">Trả phòng:</span>
                                            <span className="font-medium text-gray-800">{new Date(booking.checkoutdate).toLocaleString("vi-VN")}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-800">Giá :</span>
                                            <span className="font-medium text-red-500">
                                                {(
                                                    booking?.totalPrice +
                                                    (booking?.services?.reduce((acc: number, service: any) => acc + service.price, 0) || 0)
                                                ).toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })}
                                            </span>
                                        </div>
                                        {booking.status === "cancelled" && booking.cancelReason && (
                                            <div className="flex justify-between items-center mt-2 text-gray-500">
                                                <span>Lý do hủy:</span>
                                                <span className="font-medium text-red-500">
                                                    {getCancelReasonLabel(booking.cancelReason)}
                                                </span>
                                            </div>
                                        )}
                                        {(booking.status === "pending" || booking.status === "confirmed") && (
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() => handleCancelClick(booking._id)}
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
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Keep the existing Modal */}
            {bookingInfo?.some((booking: any) => booking.status === "completed") && (
                <Modal
                    title="Video"
                    open={isVideoModalOpen}
                    onCancel={handleCloseVideoModal}
                    width={800}
                    footer={null}
                    destroyOnClose={true}
                >
                    <div className="aspect-video">
                        {isVideoModalOpen && (
                            <iframe
                                key={reloadKey}
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/5530I_pYjbo?autoplay=1&mute=1"
                                title="Cute Dogs And Cats Videos"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        )}
                    </div>
                </Modal>
            )}
            <Modal
                title="Xác nhận hủy đơn"
                open={isModalOpen}
                onOk={handleConfirmCancel}
                onCancel={() => {
                    setIsModalOpen(false);
                    setCancelReason("");
                    setCancelReasonDetail("");
                }}
                okText="Xác nhận"
                cancelText="Hủy"
                okButtonProps={{ disabled: !cancelReason || (cancelReason === "other" && !cancelReasonDetail) }}
            >
                <div className="mt-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lý do hủy đơn *
                        </label>
                        <Select
                            className="w-full border border-gray-300 rounded-lg shadow-sm focus:border-[#8B4513] focus:ring focus:ring-[#8B4513]/50 transition duration-200"
                            placeholder="-- Chọn lý do hủy --"
                            value={cancelReason}
                            onChange={(value) => {
                                setCancelReason(value);
                                if (value !== "other") {
                                    setCancelReasonDetail("");
                                }
                            }}
                            options={CANCEL_REASONS.map(reason => ({
                                ...reason,
                                label: (
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-[#8B4513]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {reason.label}
                                    </span>
                                )
                            }))}
                        />
                    </div>
                    
                    {cancelReason === "other" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Chi tiết lý do *
                            </label>
                            <Input.TextArea
                                placeholder="Vui lòng nhập chi tiết lý do hủy đơn..."
                                value={cancelReasonDetail}
                                onChange={(e) => setCancelReasonDetail(e.target.value)}
                                rows={4}
                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:border-[#8B4513] focus:ring focus:ring-[#8B4513]/50 transition duration-200"
                            />
                        </div>
                    )}
                </div>
            </Modal>
        </div>
        </>
       
    );
};

export default InformationUser;
