
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
const CmtPages = () => {
    return (
        <div>
            <div className="lg:w-[948px] mx-auto flex justify-center">
                <strong className="lg:text-[50px] lg:leading-[70px]lg:tracking-[-4.8px] text-center">
                    NHẬN XÉT CỦA KHÁCH HÀNG
                </strong>
            </div>
            <div className="w-full">
                {/* <!-- Best comment --> */}
                <div className="w-full flex justify-center lg:my-16 my-8">
                    <div className=" flex justify-end overflow-hidden">
                        <div className="relative w-full overflow-hidden">
                            {/* Desktop Side Content */}
                            <div className="hidden lg:block">
                                <div className="bg-[#05422C] text-white rounded-2xl lg:h-full flex flex-col items-center gap-y-[23px] lg:px-10 lg:pt-[42px] lg:pb-[39px]">
                                    <strong className="lg:font-bold font-normal lg:text-[32px] text-[24px] text-center lg:tracking-[-1.75px] lg:leading-[38px]">
                                        ĐƯỢC BÌNH CHỌN LÀ CỬA HÀNG TRỰC TUYẾN TỐT NHẤT
                                    </strong>
                                    <div className="w-full border-t pt-6">
                                        <span className="lg:mt-3 block text-center">
                                            Xuất sắc
                                        </span>
                                        <div className="flex justify-center gap-x-6 mt-3">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, index) => (
                                                    <svg
                                                        key={index}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="lucide lucide-star"
                                                    >
                                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-x-2">
                                                <span>on 135</span>
                                                <span className="opacity-60">
                                                    Reviews
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Swiper Component for Comments */}
                            <div className="w-full sm:w-[900px]">
                                <Swiper
                                    slidesPerView={2}
                                    spaceBetween={10}
                                    navigation={true}
                                    modules={[Navigation]}
                                    className="mySwiper"
                                >
                                        <SwiperSlide  className="p-4">
                                            <div className="rounded-xl border p-6 h-full flex flex-col justify-between bg-white shadow-lg">
                                                {/* User Info */}
                                                <div className="flex items-center gap-[16px]">
                                                    <img
                                                        className="w-[36px] h-[36px] rounded-full"

                                                    />
                                                    <span className="font-medium"></span>
                                                </div>
                                                <hr className="my-4" />
                                                {/* Comment */}
                                                <div className="flex flex-col h-full gap-y-4">
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(4)].map((_, index) => (
                                                            <svg
                                                                key={index}
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="lucide lucide-star"
                                                            >
                                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <p className="text-sm text-gray-700">
                                                      
                                                    </p>
                                                </div>
                                                <strong className="text-left text-[#9D9EA2] text-sm mt-4">
                                                  
                                                </strong>
                                            </div>
                                        </SwiperSlide>
                                  
                                </Swiper>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="hidden">
                <div className="absolute flex justify-between lg:w-[52%] mb:w-[80%] -translate-y-1/2 lg:left-[37.5%] lg:top-1/2">
                    <button className="hover:scale-110">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-chevron-left"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </button>

                    <button className="hover:scale-110">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-chevron-right"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

    );
};

export default CmtPages;
