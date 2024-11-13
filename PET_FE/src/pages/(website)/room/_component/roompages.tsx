import { useEffect } from "react"
import { Link } from "react-router-dom"

const RoomPages = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <div className="bg-white">
                <div className=" py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
                        <div className="bg-[#FFFDD0]  rounded-2xl border border-gray-200 shadow-sm">
                            <div className="p-6 sm:px-8">
                                <h2 className="text-3xl font-medium text-gray-900">
                                    Cơ Bản
                                    <span className="sr-only">Plan</span>
                                </h2>

                                <p className="mt-2 text-gray-700">Chỗ ở thoải mái với dịch vụ chăm sóc cơ bản chu đáo dành cho thú cưng.</p>

                                <p className="mt-2 sm:mt-4">
                                    <strong className="text-xl font-bold text-gray-900"> 20.000 VNĐ/1 giờ </strong>

                                    <span className="text-sm font-medium text-gray-700">-</span>

                                    <strong className="text-xl font-bold text-gray-900"> 300.000 VNĐ/1 ngày </strong>
                                </p>

                                <a
                                    className="mt-4 block rounded border border-[#D2B48C] bg-[#D2B48C] px-12 py-3 text-center text-lg font-medium text-white hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                                    href="#"
                                >
                                    Xem Phòng
                                </a>
                            </div>

                            <div className="p-6 sm:px-8">
                                <p className="text-lg font-medium text-gray-900 sm:text-xl">Bao Gồm:</p>

                                <ul className="mt-2 space-y-2 sm:mt-4">
                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>

                                        <span className="text-gray-700"> Chỗ ở thoải mái </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>

                                        <span className="text-gray-700">Thức ăn dinh dưỡng </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>

                                        <span className="text-gray-700"> Chăm sóc hàng ngày </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>

                                        <span className="text-gray-700"> Giám sát an toàn </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-red-700"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>

                                        <span className="text-gray-700"> Chăm sóc sức khỏe </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-red-700"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>

                                        <span className="text-gray-700"> Chăm sóc cá nhân hóa </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-[#FFFDD0]  rounded-2xl border border-gray-200 shadow-sm">
                            <div className="p-6 sm:px-8">
                                <h2 className="text-3xl font-medium text-gray-900">
                                    Thịnh Hành
                                </h2>
                                <p className="mt-2 text-gray-700">Dịch vụ chăm sóc nâng cao với hoạt động vui chơi và dinh dưỡng đặc biệt.</p>

                                <p className="mt-2 sm:mt-4">
                                    <strong className="text-xl font-bold text-gray-900"> 29.000 VNĐ/1 giờ </strong>

                                    <span className="text-sm font-medium text-gray-700">-</span>

                                    <strong className="text-xl font-bold text-gray-900"> 400.000 VNĐ/1 ngày </strong>
                                </p>

                                <a
                                    className="mt-4 block rounded border border-[#D2B48C] bg-[#D2B48C] px-12 py-3 text-center text-lg font-medium text-white  hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                                    href="#"
                                >
                                    Xem Phòng
                                </a>
                            </div>

                            <div className="p-6 sm:px-8">
                                <p className="text-lg font-medium text-gray-900 sm:text-xl">Bao Gồm:</p>

                                <ul className="mt-2 space-y-2 sm:mt-4">
                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>

                                        <span className="text-gray-700"> Chỗ ở thoải mái </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>

                                        <span className="text-gray-700">Thức ăn dinh dưỡng </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>

                                        <span className="text-gray-700"> Chăm sóc hàng ngày </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>

                                        <span className="text-gray-700"> Giám sát an toàn </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>

                                        <span className="text-gray-700"> Chăm sóc sức khỏe </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-red-700"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>

                                        <span className="text-gray-700"> Chăm sóc cá nhân hóa </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-[#FFFDD0]  rounded-2xl border border-gray-200 shadow-sm">
                            <div className="p-6 sm:px-8">
                                <h2 className="text-3xl font-medium text-gray-900">
                                    Cao Cấp
                                    <span className="sr-only">Plan</span>
                                </h2>

                                <p className="mt-2 text-gray-700">Trải nghiệm sang trọng với dịch vụ spa và chế độ dinh dưỡng riêng cho thú cưng.</p>

                                <p className="mt-2 sm:mt-4">
                                    <strong className="text-xl font-bold text-gray-900"> 50.000 VNĐ/1 giờ </strong>

                                    <span className="text-sm font-medium text-gray-700">-</span>

                                    <strong className="text-xl font-bold text-gray-900"> 600.000 VNĐ/1 ngày </strong>
                                </p>

                                <Link
                                    className="mt-4 block rounded border border-[#D2B48C] bg-[#D2B48C] px-12 py-3 text-center text-lg font-medium text-white hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-indigo-500 sm:mt-6"
                                    to={'/Roompages'}
                                >
                                    Xem Phòng
                                </Link>
                            </div>

                            <div className="p-6 sm:px-8">
                                <p className="text-lg font-medium text-gray-900 sm:text-xl">Bao Gồm:</p>

                                <ul className="mt-2 space-y-2 sm:mt-4">
                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>

                                        <span className="text-gray-700"> Chỗ ở thoải mái </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>

                                        <span className="text-gray-700"> Thức ăn dinh dưỡng </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>

                                        <span className="text-gray-700"> Chăm sóc hàng ngày </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>

                                        <span className="text-gray-700"> Giám sát an toàn </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>

                                        <span className="text-gray-700"> Chăm sóc sức khỏe </span>
                                    </li>

                                    <li className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="size-5 text-indigo-700"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>

                                        <span className="text-gray-700"> Chăm sóc cá nhân hóa </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default RoomPages