import instance from "@/configs/axios"
import { useQuery } from "@tanstack/react-query"
import RoomList from "../../_component/RoomList"
import { FaFilter, FaSearch, FaSortAmountDown, FaHeart } from 'react-icons/fa'
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const PagesComponent = () => {
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Số phòng hiển thị trên mỗi trang

    const { data: room, isLoading } = useQuery({
        queryKey: ['room'],
        queryFn: () => instance.get('/room')
    });

    // Tính toán tổng số trang
    const totalItems = room?.data?.length || 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Lấy danh sách phòng cho trang hiện tại
    const getCurrentPageItems = () => {
        if (!room?.data) return [];
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return room.data.slice(startIndex, endIndex);
    };

    // Tạo mảng số trang để hiển thị
    const getPageNumbers = () => {
        const delta = 2; // Số trang hiển thị ở mỗi bên của trang hiện tại
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-b from-[#F6F0E2] to-white"
        >
            <section className="relative">
                {/* Hero Section */}
                <div className="relative h-[300px] overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601758228041-f3b2795255f1')] bg-cover bg-center">
                        <div className="absolute inset-0 bg-black/50"></div>
                    </div>
                    <div className="relative container mx-auto h-full flex items-center px-4">
                        <div className="text-white max-w-2xl">
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl md:text-5xl font-bold mb-4"
                            >
                                Phòng Cao Cấp
                                <span className="inline-block ml-3">
                                    <FaHeart className="text-red-500 animate-pulse" />
                                </span>
                            </motion.h1>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg text-gray-200"
                            >
                                Trải nghiệm sang trọng với dịch vụ spa và chế độ dinh dưỡng riêng cho thú cưng.
                            </motion.p>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    {/* Search and Filter Section */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <hr /><hr /><hr />
                        </div>
                    </div>

                    {/* Room Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="lg:col-span-3"
                        >
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                <RoomList rooms={getCurrentPageItems()} />
                            </div>
                        </motion.div>
                    </div>

                    {/* Pagination - Ch�� hiển thị khi có nhiều hơn itemsPerPage items */}
                    {totalItems > itemsPerPage && (
                        <div className="mt-12">
                            <div className="flex justify-center items-center gap-2">
                                {/* Previous Page Button */}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2
                                        ${currentPage === 1
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-[#8B4513] hover:bg-[#8B4513] hover:text-white shadow-md hover:shadow-lg'
                                        }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <span className="hidden sm:inline">Trước</span>
                                </button>

                                {/* Page Numbers */}
                                <div className="flex gap-2">
                                    {getPageNumbers().map((pageNum, index) => (
                                        <button
                                            key={index}
                                            onClick={() => typeof pageNum === 'number' && setCurrentPage(pageNum)}
                                            disabled={pageNum === '...'}
                                            className={`min-w-[40px] h-10 rounded-lg transition-all duration-300
                                                ${pageNum === currentPage
                                                    ? 'bg-[#8B4513] text-white font-medium shadow-lg scale-110'
                                                    : pageNum === '...'
                                                        ? 'cursor-default'
                                                        : 'bg-white text-[#8B4513] hover:bg-[#8B4513] hover:text-white shadow-md hover:shadow-lg'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    ))}
                                </div>

                                {/* Next Page Button */}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2
                                        ${currentPage === totalPages
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-[#8B4513] hover:bg-[#8B4513] hover:text-white shadow-md hover:shadow-lg'
                                        }`}
                                >
                                    <span className="hidden sm:inline">Sau</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Page Info */}
                            <div className="text-center mt-4 text-gray-600">
                                <p>
                                    Trang {currentPage} / {totalPages}
                                    <span className="ml-2">
                                        (Hiển thị {getCurrentPageItems().length} / {totalItems} phòng)
                                    </span>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </motion.div>
    )
}

export default PagesComponent