import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import MenuPages from "./menupages";

const PagesRight = () => {
    const { id } = useParams();
    const { data: service } = useQuery({
        queryKey: ['service', id],
        queryFn: () => instance.get(`/service/${id}`)
    });

    const exchangeRate = 1;
    const formatCurrency = (price: number) => {
        const priceInVND = price * exchangeRate;
        return priceInVND.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            {/* Header Section */}
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-3">{service?.data.servicesName}</h1>
                <div className="w-20 h-1 bg-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Dịch vụ chăm sóc thú cưng chuyên nghiệp tại PET HOTEL</p>
            </div>

            {/* Price Section */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-gray-600">Giá dịch vụ:</span>
                    <span className="text-2xl font-bold text-red-500">
                        {formatCurrency(service?.data.priceService)}
                    </span>
                </div>
                <p className="text-center text-gray-500 text-sm">
                    Giá đã bao gồm đầy đủ dịch vụ và thuế VAT
                </p>
            </div>

            {/* Features Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-blue-800">Ưu điểm dịch vụ</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                            <span className="text-blue-500">✓</span>
                            Nhân viên chuyên nghiệp
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-blue-500">✓</span>
                            Trang thiết bị hiện đại
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-blue-500">✓</span>
                            Chăm sóc 24/7
                        </li>
                    </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-green-800">Cam kết</h3>
                    <ul className="space-y-3">
<li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            An toàn tuyệt đối
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Giá cả hợp lý
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-green-500">✓</span>
                            Bảo hành dịch vụ
                        </li>
                    </ul>
                </div>
            </div>

            {/* Description Section */}
            <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-4">Mô tả dịch vụ</h2>
                <div dangerouslySetInnerHTML={{ __html: service?.data.descriptionService || '' }} 
                     className="text-gray-600 leading-relaxed"
                />
            </div>

            <div className="mt-8">
                <MenuPages/>
            </div>
        </div>
    );
};

export default PagesRight;