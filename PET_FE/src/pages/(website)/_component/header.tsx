import { GetProps, Popover } from "antd";
import Input from "antd/es/input";
import { Link } from "react-router-dom";


const HeaderPages = () => {
    type SearchProps = GetProps<typeof Input.Search>;
    const account = (
        <div>
            <Link to={"/login"}>
                <div>Đăng nhập</div>
            </Link>
            <Link to={"/register"}>
                <div>Đăng ký</div>
            </Link>
        </div>
    );
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
                                <Popover
                                    content={account}
                                    trigger="click"
                                    className="cursor-pointer"
                                >
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
                                </Popover>
                              
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