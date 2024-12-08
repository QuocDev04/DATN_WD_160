import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from 'react-router-dom';
const ProductPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Số sản phẩm trên mỗi trang
    const sortOptions = [
        { value: 'default', label: 'Mặc định' },
        { value: 'price-asc', label: 'Giá tăng dần' },
        { value: 'price-desc', label: 'Giá giảm dần' },
        { value: 'name-asc', label: 'Tên A-Z' },
        { value: 'name-desc', label: 'Tên Z-A' }
    ];

    const {data} = useQuery({
        queryKey:['product'],
        queryFn: () => instance.get('/product')
    })

    // Tính toán số trang và sản phẩm hiển thị
    const totalPages = Math.ceil((data?.data?.length || 0) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = data?.data?.slice(startIndex, endIndex);

    // Hàm lọc sản phẩm theo tên
    const filteredProducts = currentProducts?.filter((product: any) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Hàm xử lý chuyển trang
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            {/* Header Section - không thụt vào */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
                    Sản Phẩm Của Chúng Tôi
                </h1>

                {/* Search and Filter Section - thêm container và padding */}
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                        {/* Search Bar */}
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                className="w-full pl-10 pr-4 py-2 rounded-full border-2 
                                border-gray-200 focus:border-[#cfa84c] focus:outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <span className="absolute left-3 top-2.5">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                        </div>

                        {/* Sort Dropdown */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 rounded-lg border border-gray-200 focus:border-[#cfa84c] focus:outline-none"
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts?.map((product:any) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="relative pb-[100%]">
                                <img
                                    src={product.gallery[0]}
                                    alt={product.name}
                                    className="absolute p-5 w-full h-full object-cover rounded-t-lg"
                                />
                                <div className="absolute top-3 right-3">
                                    <img src="/logo.png" alt="Logo" className="w-8 h-8" />
                                </div>
                            </div>
                            <div className="p-3">
                                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">
                                    {product.productName}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2 min-h-[32px]">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: data?.data?.description || "",
                                        }}
                                    />
                                </p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-sm font-bold text-[#cfa84c]">
                                        {product.price.toLocaleString('vi-VN')}đ
                                    </span>
                                    <Link
                                        to={`/product/${product._id}`}
                                        className="px-3 py-1.5 bg-[#cfa84c] text-white text-xs rounded-full 
                                        hover:bg-[#b08d3a] transition-colors"
                                    >
                                        Xem chi tiết
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Component */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2 my-8">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 rounded-md ${
                                currentPage === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                            }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            // Hiển thị 3 trang trước và sau trang hiện tại
                            if (
                                pageNumber === 1 ||
                                pageNumber === totalPages ||
                                (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                            ) {
                                return (
                                    <button
                                        key={pageNumber}
                                        onClick={() => handlePageChange(pageNumber)}
                                        className={`px-4 py-2 rounded-md ${
                                            currentPage === pageNumber
                                                ? 'bg-[#cfa84c] text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                        }`}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            } else if (
                                pageNumber === currentPage - 3 ||
                                pageNumber === currentPage + 3
                            ) {
                                return <span key={pageNumber} className="px-2">...</span>;
                            }
                            return null;
                        })}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 rounded-md ${
                                currentPage === totalPages
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                            }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;