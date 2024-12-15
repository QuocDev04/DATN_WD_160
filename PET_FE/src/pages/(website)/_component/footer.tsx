import { FaFacebook, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaw } from "react-icons/fa";

const FooterPages = () => {
    return (
        <footer className="bg-gradient-to-b from-[#F6F0E2] to-[#E6D5B8] font-sans">
            {/* Top Section with Logo and Social */}
            <div className="container mx-auto px-4 pt-2 pb-6">
                <div className="flex flex-col items-center mb-8">
                    <img src="../public/logo.png" alt="Pet Hotel Logo" className="w-32 mb-2" />
                    <div className="flex gap-4 mt-2">
                        <a 
                            href="https://www.facebook.com/people/H%E1%BB%87-th%E1%BB%91ng-Kh%C3%A1ch-S%E1%BA%A1n-Th%C3%BA-C%C6%B0ng-Pet-Hotel/61569308776714/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#8B4513] hover:text-blue-600 transform hover:scale-110 transition-all"
                        >
                            <FaFacebook size={24} />
                        </a>
                        <a 
                            href="mailto:contact@pethotel.com"
                            className="text-[#8B4513] hover:text-red-600 transform hover:scale-110 transition-all"
                        >
                            <FaEnvelope size={24} />
                        </a>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
                    <div></div>
                    {/* About Us */}
                    <div className="text-center md:text-left">
                        <h3 className="text-[#8B4513] font-bold text-lg mb-4 flex items-center justify-center md:justify-start">
                            <FaPaw className="mr-2" /> Về Chúng Tôi
                        </h3>
                        <p className="text-[#8B4513] text-xs leading-relaxed">
                            Pet Hotel - Nơi thú cưng của bạn được chăm sóc như ở nhà.
                            Chúng tôi cam kết mang đến dịch vụ chất lượng cao.
                        </p>
                    </div>

                    {/* Services */}
                    <div className="text-center md:text-left">
                        <h3 className="text-[#8B4513] font-bold text-lg mb-4">Dịch Vụ</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-[#8B4513] hover:text-[#5C2D0C] transition-colors text-xs inline-flex items-center">
                                    <span className="w-1 h-1 bg-[#8B4513] rounded-full mr-2"></span>
                                    Lưu trú thú cưng
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[#8B4513] hover:text-[#5C2D0C] transition-colors text-xs inline-flex items-center">
                                    <span className="w-1 h-1 bg-[#8B4513] rounded-full mr-2"></span>
                                    Spa & Grooming
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[#8B4513] hover:text-[#5C2D0C] transition-colors text-xs inline-flex items-center">
                                    <span className="w-1 h-1 bg-[#8B4513] rounded-full mr-2"></span>
                                    Sản phẩm thú cưng
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-[#8B4513] hover:text-[#5C2D0C] transition-colors text-xs inline-flex items-center">
                                    <span className="w-1 h-1 bg-[#8B4513] rounded-full mr-2"></span>
                                    Huấn luyện thú cưng
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div className="text-center md:text-left">
                        <h3 className="text-[#8B4513] font-bold text-lg mb-4 flex items-center justify-center md:justify-start">
                            <FaClock className="mr-2" /> Giờ Mở Cửa
                        </h3>
                        <ul className="space-y-2 text-xs text-[#8B4513]">
                            <li>Thứ 2 - Thứ 6: 8:00 - 20:00</li>
                            <li>Thứ 7: 8:00 - 18:00</li>
                            <li>Chủ nhật: 9:00 - 17:00</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="text-center md:text-left">
                        <h3 className="text-[#8B4513] font-bold text-lg mb-4">Liên Hệ</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 justify-center md:justify-start">
                                <FaMapMarkerAlt className="text-[#8B4513] text-xs flex-shrink-0" />
                                <span className="text-[#8B4513] text-xs">
                                    123 Đường ABC, Quận XYZ, TP.HCM
                                </span>
                            </li>
                            <li className="flex items-center gap-2 justify-center md:justify-start">
                                <FaPhone className="text-[#8B4513] text-xs flex-shrink-0" />
                                <a href="tel:0909090909" className="text-[#8B4513] hover:text-[#5C2D0C] transition-colors text-xs">
                                    090.909.0909
                                </a>
                            </li>
                            <li className="flex items-center gap-2 justify-center md:justify-start">
                                <FaEnvelope className="text-[#8B4513] text-xs flex-shrink-0" />
                                <a href="mailto:info@pethotel.com" className="text-[#8B4513] hover:text-[#5C2D0C] transition-colors text-xs">
                                    info@pethotel.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Section */}
            <div className="p-4 text-center border-t border-gray-200 bg-[#f6f0e2] rounded-[40px_40px_0_0]">
                <p className="text-sm text-gray-500">© 2024 Pet Hotel. All rights reserved.
                    <span className="text-gray-300 text-lg">  |  </span>
                    Điều khoản sử dụng
                    <span className="text-gray-300 text-lg">  |  </span>
                    Chính sách bảo mật
                </p>
            </div>
        </footer>
    );
}

export default FooterPages;