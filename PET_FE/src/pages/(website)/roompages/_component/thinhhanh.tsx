import instance from "@/configs/axios"
import { useQuery } from "@tanstack/react-query"
import { FaHeart, FaRuler, FaTemperatureHigh, FaPaw, FaUser, FaHome, FaDog, FaHouseDamage, FaCat } from 'react-icons/fa'
import { MdPets, MdCleaningServices } from 'react-icons/md'
import { motion } from "framer-motion"
import { useState } from "react"
import { Link } from "react-router-dom"

const ThinhHanh = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const { data: room } = useQuery({
        queryKey: ['room'],
        queryFn: () => instance.get('/room')
    });

    // Lọc ra chỉ phòng cao cấp
    const highClassRooms = room?.data?.filter((item: any) => 
        item.category[0]?.title === "Thịnh Hành"
    ) || [];

    // Tính toán phân trang dựa trên highClassRooms
    const totalItems = highClassRooms.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Lấy các phòng cao cấp cho trang hiện tại
    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return highClassRooms.slice(startIndex, endIndex);
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

    // Add the getStatusStyle function
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'pending':
                return {
                    icon: <FaPaw className="text-white w-4 h-4" />,
                    bgColor: 'bg-yellow-500',
                    tooltip: 'Đang chờ'
                };
            case 'drum':
                return {
                    icon: <FaHome className="text-white w-4 h-4" />,
                    bgColor: 'bg-blue-500',
                    tooltip: 'Đang Trống'
                };
            case 'confirmed':
                return {
                    icon: <FaDog className="text-white w-4 h-4" />,
                    bgColor: 'bg-green-500',
                    tooltip: 'Đã xác nhận'
                };
            case 'completed':
                return {
                    icon: <FaCat className="text-white w-4 h-4" />,
                    bgColor: 'bg-purple-500',
                    tooltip: 'Đã đầy'
                };
            default:
                return {
                    icon: <MdPets className="text-white w-4 h-4" />,
                    bgColor: 'bg-gray-500',
                    tooltip: 'Không xác định'
                };
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-b from-[#FFF6E7] to-white"
        >
            {/* Hero Section - Updated design */}
            <section className="relative">
                <div className="relative h-[400px] overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1601758228041-f3b2795255f1')] bg-cover bg-center bg-fixed">
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
                    </div>
                    <div className="relative container mx-auto h-full flex items-center px-4">
                        <div className="text-white max-w-3xl">
                            <motion.span
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="inline-block px-4 py-2 bg-red-500/20 rounded-full text-red-400 mb-4"
                            >
                                Premium Services
                            </motion.span>
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
                            >
                                Phòng Thịnh Hành
                                <span className="inline-block ml-3">
                                    <FaHeart className="text-red-500 animate-pulse" />
                                </span>
                            </motion.h1>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-xl text-gray-200 max-w-2xl"
                            >
                                Trải nghiệm sang trọng với dịch vụ spa và chế độ dinh dưỡng riêng cho thú cưng của bạn.
                            </motion.p>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Section - Updated with 2 filters */}
                <div className="container mx-auto px-4 -mt-20 relative z-10 mb-12">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-gray-600 font-medium">Giá</label>
                                <select className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B4513]/20">
                                    <option>Tất cả mức giá</option>
                                    <option>Dưới 500.000đ</option>
                                    <option>500.000đ - 1.000.000đ</option>
                                    <option>Trên 1.000.000đ</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-gray-600 font-medium">Sắp xếp theo</label>
                                <select className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B4513]/20">
                                    <option>Mới nhất</option>
                                    <option>Giá: Thấp đến cao</option>
                                    <option>Giá: Cao đến thấp</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Updated Room List Section with 4 columns */}
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {getCurrentPageItems().map((item: any) => (
                            <div key={item._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <div className="relative">
                                    <img
                                        src={item.roomgallely[0]}
                                        alt={item.roomName}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className={`absolute top-2 right-2 p-2 rounded-full ${getStatusStyle(item.status).bgColor} group`}>
                                        {getStatusStyle(item.status).icon}
                                        <div className="absolute hidden group-hover:block right-0 mt-2 bg-black text-white text-sm py-1 px-2 rounded whitespace-nowrap">
                                            {getStatusStyle(item.status).tooltip}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{item.roomName}</h3>


                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="flex items-center gap-2">
                                            <FaRuler className="text-[#8B4513]" />
                                            <span className="text-gray-600">1m²</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaTemperatureHigh className="text-[#8B4513]" />
                                            <span className="text-gray-600">Điều hòa</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MdCleaningServices className="text-[#8B4513]" />
                                            <span className="text-gray-600">Vệ sinh hàng ngày</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="flex items-center gap-2">
                                                <FaPaw className="text-[#8B4513]" />
                                                <span className="text-gray-600">Phù hợp: Đa dạng</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MdPets className="text-[#8B4513]" />
                                                <span className="text-gray-600">Tối đa: 1 thú cưng</span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="text-2xl font-bold text-red-600">
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                }).format(item.roomprice)}
                                                <span className="text-sm text-gray-500">/giờ</span>
                                            </div>
                                            <Link to={`/Roompages/${item._id}`}>
                                                <button className="bg-[#8B4513] text-white px-6 py-2 rounded-lg hover:bg-[#6F3709] transition-colors duration-300">
                                                    Đặt phòng
                                                </button>
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination - Updated styling */}
                    {totalItems > itemsPerPage && (
                        <div className="mt-16">
                            <div className="flex justify-center items-center gap-3">
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

export default ThinhHanh