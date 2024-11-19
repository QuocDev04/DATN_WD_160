import { useEffect } from "react"
import { Link } from "react-router-dom"
import { FaCheck, FaTimes, FaPaw, FaBone, FaHeart, FaStar } from 'react-icons/fa';
import { motion } from "framer-motion";

const RoomPages = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const roomTypes = [
        {
            type: "Cơ Bản",
            description: "Chỗ ở thoải mái với dịch vụ chăm sóc cơ bản chu đáo dành cho thú cưng.",
            pricePerHour: "20.000",
            pricePerDay: "300.000",
            features: [
                { name: "Chỗ ở thoải mái", included: true },
                { name: "Thức ăn dinh dưỡng", included: true },
                { name: "Chăm sóc hàng ngày", included: true },
                { name: "Giám sát an toàn", included: true },
                { name: "Chăm sóc sức khỏe", included: false },
                { name: "Chăm sóc cá nhân hóa", included: false },
            ],
            color: "emerald",
            recommended: false
        },
        {
            type: "Thịnh Hành",
            description: "Dịch vụ chăm sóc nâng cao với hoạt động vui chơi và dinh dưỡng đặc biệt.",
            pricePerHour: "29.000",
            pricePerDay: "400.000",
            features: [
                { name: "Chỗ ở thoải mái", included: true },
                { name: "Thức ăn dinh dưỡng", included: true },
                { name: "Chăm sóc hàng ngày", included: true },
                { name: "Giám sát an toàn", included: true },
                { name: "Chăm sóc sức khỏe", included: true },
                { name: "Chăm sóc cá nhân hóa", included: false },
            ],
            color: "amber",
            recommended: true
        },
        {
            type: "Cao Cấp",
            description: "Trải nghiệm sang trọng với dịch vụ spa và chế độ dinh dưỡng riêng cho thú cưng.",
            pricePerHour: "50.000",
            pricePerDay: "600.000",
            features: [
                { name: "Chỗ ở thoải mái", included: true },
                { name: "Thức ăn dinh dưỡng", included: true },
                { name: "Chăm sóc hàng ngày", included: true },
                { name: "Giám sát an toàn", included: true },
                { name: "Chăm sóc sức khỏe", included: true },
                { name: "Chăm sóc cá nhân hóa", included: true },
            ],
            color: "purple",
            recommended: false
        }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 bg-gradient-to-b from-[#F6F0E2] to-white -z-10">
                <div className="absolute inset-0">
                    {/* Animated Paw Prints */}
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${i * 2}s`,
                                opacity: 0.1
                            }}
                        >
                            <FaPaw className="text-[#8B4513] text-4xl" />
                        </div>
                    ))}
                    
                    {/* Animated Bones */}
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={`bone-${i}`}
                            className="absolute animate-float-reverse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${i * 1.5}s`,
                                opacity: 0.1
                            }}
                        >
                            <FaBone className="text-[#D2B48C] text-3xl" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 relative">
                {/* Header Section with Animation */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-[#8B4513] mb-6 relative inline-block">
                        Dịch Vụ Phòng Thú Cưng
                        <div className="absolute -top-4 -right-8">
                            <FaHeart className="text-[#D2B48C] text-2xl animate-pulse" />
                        </div>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Chọn gói dịch vụ phù hợp với nhu cầu của thú cưng của bạn
                    </p>
                </motion.div>

                {/* Room Types Grid with Animation */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
                    {roomTypes.map((room, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ 
                                scale: 1.03,
                                transition: { duration: 0.2 }
                            }}
                            key={index}
                            className={`relative rounded-2xl shadow-xl overflow-hidden bg-white
                                ${room.recommended ? 'border-2 border-[#D2B48C]' : 'border border-gray-200'}
                            `}
                        >
                            {room.recommended && (
                                <div className="absolute top-4 right-4">
                                    <motion.span 
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="bg-[#D2B48C] text-white px-4 py-1 rounded-full text-sm font-medium inline-flex items-center gap-2"
                                    >
                                        <FaStar className="text-yellow-300" />
                                        Phổ biến nhất
                                    </motion.span>
                                </div>
                            )}

                            <div className="p-8 relative overflow-hidden">
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-5">
                                    <div className="absolute inset-0 pattern-paws"></div>
                                </div>

                                <motion.div 
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.3 }}
                                    className="flex items-center gap-3 mb-4"
                                >
                                    <FaPaw className="text-[#D2B48C] text-2xl" />
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        {room.type}
                                    </h2>
                                </motion.div>

                                <p className="text-gray-600 mb-6 relative z-10">
                                    {room.description}
                                </p>

                                <motion.div 
                                    className="mb-8"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: index * 0.4 }}
                                >
                                    <div className="flex items-baseline justify-center gap-2 mb-2">
                                        <span className="text-3xl font-bold text-[#8B4513]">
                                            {room.pricePerHour} VNĐ
                                        </span>
                                        <span className="text-gray-600">/giờ</span>
                                    </div>
                                    <div className="flex items-baseline justify-center gap-2">
                                        <span className="text-3xl font-bold text-[#8B4513]">
                                            {room.pricePerDay} VNĐ
                                        </span>
                                        <span className="text-gray-600">/ngày</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="relative z-10"
                                >
                                    {room.type === "Cơ Bản" && (
                                        <Link
                                        to={'/Roompages'}
                                            className={`block text-center py-3 px-6 rounded-lg font-medium transition-all duration-300
                                                ${room.recommended 
                                                    ? 'bg-[#D2B48C] text-white hover:bg-[#8B4513] shadow-lg hover:shadow-xl' 
                                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                }`}
                                        >
                                            Đặt Phòng Cơ Bản
                                        </Link>
                                    )}
                                    
                                    {room.type === "Thịnh Hành" && (
                                        <Link
                                        to={'/Roompages'}
                                            className={`block text-center py-3 px-6 rounded-lg font-medium transition-all duration-300
                                                ${room.recommended 
                                                    ? 'bg-[#D2B48C] text-white hover:bg-[#8B4513] shadow-lg hover:shadow-xl' 
                                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                }`}
                                        >
                                            Đặt Phòng Thịnh Hành
                                        </Link>
                                    )}
                                    
                                    {room.type === "Cao Cấp" && (
                                        <Link
                                        to={'/Roompages'}
                                            className={`block text-center py-3 px-6 rounded-lg font-medium transition-all duration-300
                                                ${room.recommended 
                                                    ? 'bg-[#D2B48C] text-white hover:bg-[#8B4513] shadow-lg hover:shadow-xl' 
                                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                }`}
                                        >
                                            Đặt Phòng Cao Cấp
                                        </Link>
                                    )}
                                </motion.div>

                                <div className="mt-8 space-y-4 relative z-10">
                                    {room.features.map((feature, idx) => (
                                        <motion.div 
                                            key={idx} 
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 + idx * 0.1 }}
                                            className="flex items-center gap-3"
                                        >
                                            {feature.included ? (
                                                <FaCheck className="text-green-500 flex-shrink-0" />
                                            ) : (
                                                <FaTimes className="text-red-500 flex-shrink-0" />
                                            )}
                                            <span className={`text-gray-600 ${!feature.included && 'line-through text-gray-400'}`}>
                                                {feature.name}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Information with Animation */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-600 mb-6">
                        Tất cả các gói dịch vụ đều bao gồm dịch vụ chăm sóc cơ bản 24/7
                    </p>
                    <motion.div 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                        className="relative z-10"
                    >
                        <Link
                            to="/contact-us"
                            className="inline-block bg-[#8B4513] text-white px-6 py-3 rounded-lg hover:bg-[#6B3E26] transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Liên Hệ Tư Vấn
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default RoomPages