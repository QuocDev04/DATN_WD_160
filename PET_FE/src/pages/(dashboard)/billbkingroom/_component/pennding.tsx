import instance from "@/configs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";

const Pending = () => {
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery({
        queryKey: ["bookingroom"],
        queryFn: async () => instance.get(`/bookingroom`),
    });
    const [api, contextHolder] = notification.useNotification();
    const pendingBookings = data?.data?.filter((item: any) => item.status === "pending");
    const openNotification =
        (pauseOnHover: boolean) =>
            (type: "success" | "error", message: string, description: string) => {
                api.open({
                    message,
                    description,
                    type,
                    showProgress: true,
                    pauseOnHover,
                })
            };
    const { mutate: patch } = useMutation({
        mutationFn: async ({ bookingId, status }: { bookingId: string, status: string }) => {
            try {
                return await instance.patch(`/bookingroom/${bookingId}/status`, { status });
            } catch (error) {
                throw new Error("Error updating booking status");
            }
        },
        onSuccess: () => {
            openNotification(false)(
                "success",
                "Chuyển Trạng Thái Thành Công",
                "BạnChuyển Trạng Thái Thành Công"
            );
            queryClient.invalidateQueries({
                queryKey: ["bookingroom"],
            });
        },

        onError: () => {
            openNotification(false)(
                "error",
                "Chuyển Trạng Thái Thất Bại",
                "Bạn Chuyển Trạng Thái thất bại. Vui Lòng thử lại sau",
            );
        },
    });

    // Handle loading state
    if (isLoading) return <div>Loading...</div>;

    // Handle error state
    if (error) return <div>Error fetching data</div>;

    return (
        <>
            {contextHolder}
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
                            <span className="text-green-600 font-bold text-2xl">
                                {item.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </span>
                        </div>

                        {/* Trạng thái */}
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-600">Trạng thái:</span>
                            <span className="text-blue-600 font-bold">
                                {item.status === "pending" ? "Chờ Xác Nhận" : item.status}
                            </span>
                        </div>

                        {/* Nút thao tác */}
                        <div className="flex space-x-4">
                            <button className="w-1/2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Tải hóa đơn
                            </button>

                            {/* Nút xác nhận */}
                            <button
                                className="w-1/2 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                onClick={() => patch({ bookingId: item._id, status: "confirmed" })}  // Thay đổi trạng thái thành "confirmed"
                            >
                                Xác Nhận
                            </button>

                            {/* Nút hủy */}
                            <button
                                className="w-1/2 py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                onClick={() => patch({ bookingId: item._id, status: "cancelled" })}  // Thay đổi trạng thái thành "cancelled"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Pending;
