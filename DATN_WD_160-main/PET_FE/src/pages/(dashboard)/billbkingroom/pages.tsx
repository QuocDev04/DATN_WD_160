import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineCheckCircle } from "react-icons/ai"

const PagesBillRoom = () => {
    const { data } = useQuery({
        queryKey: ["bookingroom"],
        queryFn: async () => instance.get(`/bookingroom`)
    });
    return (
        <>
            <div className="relative mt-20 h-auto pb-20 mb-96 max-w-[1200px] mx-auto bg-gray-100  rounded-lg">
                <span className=" text-xs font-medium  text-center p-0.5 leading-none rounded-full px-2  absolute -translate-y-1/2 translate-x-1/2 right-1/2">
                    <AiOutlineCheckCircle className="size-20 text-green-600" />
                </span>
                <div className="flex items-center flex-col">
                    <h4 className="text-center mt-10 font-bold text-2xl">
                        Thông tin khách đặt phòng
                    </h4>
                </div>
                {data?.data?.map((item:any) => (
                    <div key={item._id} className="mt-8 p-6 border border-gray-900 rounded-lg">
                        {/* Thông tin đặt phòng */}
                        <div className="mb-6">
                            <h4 className="font-medium text-xl mb-4">Thông tin đặt phòng</h4>
                            <div className="grid grid-cols-5 gap-y-2">
                                <p className="font-medium col-span-2 text-md text-neutral-600">ID Đặt Phòng</p>
                                <p className="col-span-3 text-base">{item._id}</p>

                                <p className="font-medium col-span-2 text-md text-neutral-600">Thời Gian Đặt Phòng</p>
                                <p className="col-span-3 text-base">{new Date(item.createdAt).toLocaleString("vi-VN")}</p>

                                <p className="font-medium col-span-2 text-md text-neutral-600">Thông Tin Người Đặt</p>
                                <p className="col-span-3 text-base">{item.lastName || "N/A"}</p>

                                <p className="font-medium col-span-2 text-md text-neutral-600">Số Điện Thoại</p>
                                <p className="col-span-3 text-base">{item.phone || "N/A"}</p>

                                <p className="font-medium col-span-2 text-md text-neutral-600">Ngày bắt đầu</p>
                                <p className="col-span-3 text-base">{new Date(item.checkindate).toLocaleString("vi-VN")}</p>

                                <p className="font-medium col-span-2 text-md text-neutral-600">Ngày kết thúc</p>
                                <p className="col-span-3 text-base">{new Date(item.checkoutdate).toLocaleString("vi-VN")}</p>
                            </div>
                        </div>

                        {/* Các mặt hàng */}
                        {/* <div className="mb-6">
                            <h4 className="font-medium text-xl mb-4">Các Mặt Hàng</h4>
                            {item.items?.map((product, index) => (
                                <div key={index} className="flex justify-between border-b py-2">
                                    <p className="text-sm">{product.name}</p>
                                    <p className="text-sm">{product.quantity} x {product.price.toLocaleString("vi-VN")} VND</p>
                                </div>
                            ))}
                        </div> */}

                        {/* Tổng số tiền và trạng thái */}
                        <div className="flex justify-between items-center mb-6">
                            <p className="font-semibold text-sm">Tổng số tiền </p>
                            <p className="font-semibold text-sm">{item.totalAmount?.toLocaleString("vi-VN")} VND</p>
                        </div>

                        <div className="flex items-center mb-4">
                            <h4 className="font-medium text-lg mr-3">Hình thức thanh toán</h4>
                            <p className="text-sm">{item.paymentMethod || "Chưa xác định"}</p>
                        </div>
                        <div className="flex items-center">
                            <h4 className="font-medium text-lg mr-3">Trạng thái đơn hàng</h4>
                            <span className={`badge text-white text-xs px-2 py-1 rounded-3xl ${item.status === "pending" ? "bg-yellow-500" :
                                    item.status === "completed" ? "bg-green-500" :
                                        "bg-red-500"
                                }`}>
                                {item.status || "Chưa xác định"}
                            </span>
                        </div>

                        {/* Nút hủy đơn hàng
                        <button className="bg-red-700 hover:bg-red-800 text-white rounded-full mt-6 w-full py-2">
                            Hủy Đơn Hàng
                        </button> */}
                    </div>
                ))}

            </div>
        </>
    )
}
export default PagesBillRoom