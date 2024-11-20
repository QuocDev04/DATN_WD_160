import {  Popover } from "antd";
import { Link } from "react-router-dom";
import { FaUserCircle, FaPhoneVolume, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useEffect, useState } from "react";


const HeaderPages = () => {

    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        setUserId(localStorage.getItem("userId"));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        setUserId(null); // Cập nhật lại state
        window.location.href = "/";
    };

    const account = (
        <div className="flex flex-col gap-1 p-2 min-w-[150px] bg-[#F6F0E2] rounded-lg shadow-md border border-[#E6D5B8]">
            <h3 className="text-[#8B4513] text-sm font-medium pb-1 border-b border-[#E6D5B8] mb-1">
                Tài khoản
            </h3>
            <Link to={"/login"}>
                <div className="hover:bg-[#E6D5B8] px-3 py-1.5 rounded-md transition-all text-[#8B4513] text-sm">
                    Đăng nhập
                </div>
            </Link>
            <Link to={"/register"}>
                <div className="hover:bg-[#E6D5B8] px-3 py-1.5 rounded-md transition-all text-[#8B4513] text-sm">
                    Đăng ký
                </div>
            </Link>
        </div>
    );

    const user = (
        <div className="flex flex-col gap-1 p-2 min-w-[150px] bg-[#F6F0E2] rounded-lg shadow-md border border-[#E6D5B8]">
            <h3 className="text-[#8B4513] text-sm font-medium pb-1 border-b border-[#E6D5B8] mb-1">
                Tài khoản
            </h3>
            <Link to={"/profile"}>
                <div className="hover:bg-[#E6D5B8] px-3 py-1.5 rounded-md transition-all text-[#8B4513] text-sm">
                    Thông Tin
                </div>
            </Link>
            <div
                onClick={handleLogout}
                className="hover:bg-[#E6D5B8] px-3 py-1.5 rounded-md transition-all cursor-pointer text-red-600 hover:text-red-700 text-sm"
            >
                Đăng Xuất
            </div>
        </div>
    );

    const token = localStorage.getItem("token");
    return (
        <>
            <header className="bg-gradient-to-b from-[#F6F0E2] to-[#E6D5B8]  mb-[3px] h-[110px] ">
                <div className="border-b border-[#8B4513]/20">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between py-2">
                            {/* Hotline */}
                            <div className="inline-flex items-center gap-2 px-2 group">
                                <span className="text-[#8B4513] text-sm italic">
                                    Pet-Hotel sẵn sàng phục vụ bạn:
                                </span>
                                <div className="inline-flex items-center gap-1">
                                    <FaPhoneVolume className="text-[#8B4513] text-base" />
                                    <a href="tel:0909090909" className="text-[#8B4513] text-sm font-medium 
                                    hover:text-[#EE0C6F] transition-all duration-300">
                                        090.909.0909
                                    </a>
                                </div>
                            </div>

                            {/* Social Icons */}
                            <div className="flex items-center gap-3">
                                <a
                                    href="https://facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#8B4513] hover:text-[#6B3E26] transition-all duration-300"
                                >
                                    <FaFacebook className="text-xl hover:scale-110" />
                                </a>
                                <a
                                    href="mailto:example@gmail.com"
                                    className="text-[#8B4513] hover:text-[#6B3E26] transition-all duration-300"
                                >
                                    <MdEmail className="text-xl hover:scale-110" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Navigation */}
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-1">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex-1 md:flex md:items-center md:gap-12">
                            <Link to="/" className="block transition-transform hover:scale-105">
                                <span className="sr-only">Home</span>
                                <img src="../public/logo.png" className="w-16 hidden md:block" alt="Logo" />
                            </Link>

                            {/* Navigation Links */}
                            <nav className="hidden md:flex flex-1 justify-center">
                                <ul className="flex items-center gap-6 text-[15px]">
                                    <li>
                                        <Link to={'/'} className="text-[#8B4513] font-medium transition-all duration-300 
                                        hover:text-[#6B3E26] relative after:content-[''] after:absolute after:w-0 
                                        after:h-0.5 after:bg-[#6B3E26] after:left-0 after:-bottom-1 
                                        hover:after:w-full after:transition-all after:duration-300">
                                            Trang Chủ
                                        </Link>
                                    </li>
                                    <span className="text-[#8B4513]">|</span>
                                    <li>
                                        <Link to={'/product'} className="text-[#8B4513] font-medium transition-all duration-300 
                                        hover:text-[#6B3E26] relative after:content-[''] after:absolute after:w-0 
                                        after:h-0.5 after:bg-[#6B3E26] after:left-0 after:-bottom-1 
                                        hover:after:w-full after:transition-all after:duration-300">
                                            Giới Thiệu Sản Phẩm
                                        </Link>
                                    </li>
                                    <span className="text-[#8B4513]">|</span>
                                    <li>
                                        <Link to={'/petmagazine'} className="text-[#8B4513] font-medium transition-all duration-300 
                                        hover:text-[#6B3E26] relative after:content-[''] after:absolute after:w-0 
                                        after:h-0.5 after:bg-[#6B3E26] after:left-0 after:-bottom-1 
                                        hover:after:w-full after:transition-all after:duration-300">
                                            Tạp Chí Thú Cưng
                                        </Link>
                                    </li>
                                    <span className="text-[#8B4513]">|</span>
                                    <li>
                                        <Link to={'/Room'} className="text-[#8B4513] font-medium transition-all duration-300 
                                        hover:text-[#6B3E26] relative after:content-[''] after:absolute after:w-0 
                                        after:h-0.5 after:bg-[#6B3E26] after:left-0 after:-bottom-1 
                                        hover:after:w-full after:transition-all after:duration-300">
                                            Đặt Phòng
                                        </Link>
                                    </li>
                                    <span className="text-[#8B4513]">|</span>
                                    <li>
                                        <Link to={'/Hotline'} className="text-[#8B4513] font-medium transition-all duration-300 
                                        hover:text-[#6B3E26] relative after:content-[''] after:absolute after:w-0 
                                        after:h-0.5 after:bg-[#6B3E26] after:left-0 after:-bottom-1 
                                        hover:after:w-full after:transition-all after:duration-300">
                                            Liên Hệ
                                        </Link>
                                    </li>
                                    <span className="text-[#8B4513]">|</span>
                                    <li>
                                        <Link to={'/Shop'} className="text-[#8B4513] font-medium transition-all duration-300 
                                        hover:text-[#6B3E26] relative after:content-[''] after:absolute after:w-0 
                                        after:h-0.5 after:bg-[#6B3E26] after:left-0 after:-bottom-1 
                                        hover:after:w-full after:transition-all after:duration-300">
                                            Giới Thiệu Về Shop
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center gap-4">
                            {token ? (
                                <Popover content={user} trigger="click" className="cursor-pointer">
                                    <div className="text-[#8B4513] hover:text-[#6B3E26] transition-all duration-300 hover:scale-110">
                                        <FaUserCircle className="text-2xl" />
                                    </div>
                                </Popover>
                            ) : (
                                <Popover content={account} trigger="click" className="cursor-pointer">
                                    <div className="text-[#8B4513] hover:text-[#EE0C6F] 
                                    transition-all duration-300 hover:scale-110">
                                        <FaUserCircle className="text-2xl" />
                                    </div>
                                </Popover>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <div className="h-[7px] bg-white"></div>
        </>
    );
};

export default HeaderPages