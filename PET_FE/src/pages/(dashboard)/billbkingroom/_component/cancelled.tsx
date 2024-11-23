import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { jsPDF } from "jspdf";

const Cancelled = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["bookingroom"],
        queryFn: async () => instance.get(`/bookingroom`),
    });
    const pendingBookings = data?.data?.filter((item: any) => item.status === "cancelled");
    console.log(pendingBookings);
    
    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Error fetching data</div>;

    // Function to generate and download the invoice PDF
    const generateInvoice = (item: any) => {
        const doc = new jsPDF();

        doc.setFont("helvetica", "normal");

        // Add title
        doc.setFontSize(22);
        doc.text("Hóa Đơn Đặt Phòng", 14, 20);

        // Customer info
        doc.setFontSize(16);
        doc.text(`Họ và tên: ${item.lastName}`, 14, 30);
        doc.text(`Số điện thoại: ${item.phone}`, 14, 40);
        doc.text(`Email: ${item.gmail}`, 14, 50);
        doc.text(`Thời gian đặt phòng: ${new Date(item.createdAt).toLocaleString("vi-VN")}`, 14, 60);

        // Room info
        doc.text(`Tên phòng: ${item?.items[0]?.roomId?.roomName}`, 14, 70);
        doc.text(`Ngày nhận phòng: ${new Date(item.checkindate).toLocaleString("vi-VN")}`, 14, 80);
        doc.text(`Ngày trả phòng: ${new Date(item.checkoutdate).toLocaleString("vi-VN")}`, 14, 90);

        // Total price
        doc.setFontSize(18);
        doc.text(`Tổng tiền: ${item.totalPrice.toLocaleString()} VNĐ`, 14, 110);

        // Status
        doc.text(`Trạng thái: ${item.status === "cancelled" ? "Đã Hủy" : item.status}`, 14, 120);

        // Save the PDF
        doc.save(`HoaDon_${item._id}.pdf`);
    };

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
                            <span className="text-green-600 font-bold text-2xl">
                                {item.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </span> 
                        </div>

                        {/* Trạng thái */}
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-gray-600">Trạng thái:</span>
                            <span className="text-blue-600 font-bold">
                                {item.status === "cancelled" ? "Đã Hủy" : item.status}
                            </span>
                        </div>

                        {/* Nút thao tác */}
                        <div className="flex space-x-4">
                            <button
                                onClick={() => generateInvoice(item)} // Trigger the PDF generation
                                className="w-1/2 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Tải hóa đơn
                            </button>

                            {/* Nút xác nhận */}
                            <button className="w-1/2 py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                               Đã hủy
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Cancelled;
