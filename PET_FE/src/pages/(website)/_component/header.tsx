import { GetProps } from "antd";
import Input from "antd/es/input";
import { Link } from "react-router-dom";


const HeaderPages = () => {
    type SearchProps = GetProps<typeof Input.Search>;

    const { Search } = Input;
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    return (
        <>
            <header className="bg-[#F6F0E2]">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 md:flex md:items-center md:gap-12">
                            <a className="block text-teal-600">
                                <span className="sr-only">Home</span>
                                <img src="../public/image.png" className="w-24  hidden md:relative md:block" />
                            </a>
                            <Search placeholder="Nhập Nội Dung Cần Tìm Kiếm" onSearch={onSearch} enterButton  />
                        </div>
                        <div className="md:flex md:items-center md:gap-12 ml-4">
                            <button className="hidden md:relative md:block">Cửa Hàng Gần Bạn</button>
                            <div className="hidden md:relative md:block">
                                <button
                                    type="button"
                                    className="overflow-hidden rounded-full border border-gray-300 shadow-inner"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt=""
                                        className="size-10 object-cover"
                                    />
                                </button>

                                {/* <div
                                    className="absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                                    role="menu"
                                >
                                    <div className="p-2">
                                        <a
                                           
                                            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                            role="menuitem"
                                        >
                                            My profile
                                        </a>

                                        <a
                                           
                                            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                            role="menuitem"
                                        >
                                            Billing summary
                                        </a>

                                        <a
                                           
                                            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                            role="menuitem"
                                        >
                                            Team settings
                                        </a>
                                    </div>

                                    <div className="p-2">
                                        <form method="POST" action="#">
                                            <button
                                                type="submit"
                                                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                                role="menuitem"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="size-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                                                    />
                                                </svg>

                                                Logout
                                            </button>
                                        </form>
                                    </div>
                                </div> */}
                            </div>

                            <div className="block md:hidden">
                                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="size-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                  
            </header>
            <div className="flex items-center justify-center pb-2 bg-[#F6F0E2] ">
                <div className=" hidden md:relative md:block">
                       <ul className="flex items-center gap-6 text-md">
                        <li>
                            <Link to={''} className="text-gray-500 transition hover:text-gray-500/75"> Trang Chủ </Link >
                        </li>

                        <li>
                            <Link to={''} className="text-gray-500 transition hover:text-gray-500/75"> Giới Thiệu Sản Phẩm </Link >
                        </li>

                        <li>
                            <Link to={''} className="text-gray-500 transition hover:text-gray-500/75"> Tạp Chí Thú Cưng </Link >
                        </li>

                        <li>
                            <Link to={''} className="text-gray-500 transition hover:text-gray-500/75"> Đặt Phòng </Link >
                        </li>

                        <li>
                            <Link to={''} className="text-gray-500 transition hover:text-gray-500/75"> Liên Hệ </Link >
                        </li>

                        <li>
                            <Link to={''} className="text-gray-500 transition hover:text-gray-500/75"> Giới Thiệu Về Shop </Link >
                        </li>
            </ul> 
                </div>
             
            </div>
           
        </>
    )
}
export default HeaderPages