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
        <div className="p-6 rounded-lg shadow-md">
            {/* Title */}
            <h1 className="text-2xl font-bold mb-2">{service?.data.servicesName}</h1>
            <p className="text-gray-400 mb-4">Thương hiệu: <span className="text-gray-500">PET HOTEL</span> | Mã sản phẩm: Đang cập nhật</p>
            {/* Price */}
            <p className="text-red-500 text-3xl font-bold mb-6">{formatCurrency(service?.data.priceService)}</p>

            {/* Promotions */}
            <div className="bg-gray-200 p-4 rounded-md mb-6">
                <h3 className="text-lg font-semibold mb-2">🎁 Quà tặng khuyến mãi</h3>
                <ul className="space-y-1 text-sm">
                    <li>1. Nhập mã EGANY thêm 5% đơn hàng</li>
                    <li>2. Giảm giá 10% khi mua từ 5 sản phẩm</li>
                    <li>3. Giảm giá 10% khi mua từ 5 sản phẩm</li>
                    <li>4. Tặng phiếu mua hàng khi mua từ 500k</li>
                </ul>
            </div>

            {/* Discount Codes */}
            <div className="flex space-x-2 mb-6">
                <span className="text-gray-400 py-1 px-3 rounded">EGA50TH...</span>
                <span className="text-gray-400 py-1 px-3 rounded">EGA30TH...</span>
                <span className="text-gray-400 py-1 px-3 rounded">FREESHIP...</span>
            </div>

            {/* Options */}
            <div className="space-y-4">
                {/* Weight Options */}
                <div>
                    <label className="block text-sm font-medium mb-1">Cân nặng</label>
                    <div className="flex space-x-2">
                        <button className="bg-red-600 py-1 px-3 rounded focus:outline-none">&lt; 3kg</button>
                        <button className="py-1 px-3 rounded hover:bg-gray-500">3 - 5kg</button>
                        <button className="py-1 px-3 rounded hover:bg-gray-500">5 - 10kg</button>
                        <button className="py-1 px-3 rounded hover:bg-gray-500">10 - 20kg</button>
                        <button className="py-1 px-3 rounded hover:bg-gray-500">&gt; 20kg</button>
                    </div>
                </div>

                {/* Fur Options */}
                <div>
                    <label className="block text-sm font-medium mb-1">Lông</label>
                    <div className="flex space-x-2">
                        <button className="bg-red-600 py-1 px-3 rounded focus:outline-none">Ngắn</button>
                        <button className="py-1 px-3 rounded hover:bg-gray-500">Dài</button>
                    </div>
                </div>

                {/* Quantity Selection */}
                <div>
                    <label className="block text-sm font-medium mb-1">Số lượng</label>
                    <div className="flex items-center space-x-2">
                        <button className="py-1 px-3 rounded focus:outline-none">-</button>
                        <input type="number" defaultValue={1} className="w-16 text-center py-1 rounded focus:outline-none" />
                        <button className="py-1 px-3 rounded focus:outline-none">+</button>
                    </div>
                </div>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full mt-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out">
                
            </button>
            <div>
                <MenuPages/>
            </div>
        </div>
    );
};

export default PagesRight;
