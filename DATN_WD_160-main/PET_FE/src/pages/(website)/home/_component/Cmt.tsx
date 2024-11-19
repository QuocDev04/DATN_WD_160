import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
const CmtPages = () => {
    return (
        <div>
            <img src="https://theme.hstatic.net/1000238938/1000576591/14/banner_collection.jpg?v=386" alt="" className="w-full"/>
            <div className="lg:w-[948px] mx-auto flex justify-center">
                <strong className="lg:text-[50px] lg:leading-[70px] lg:tracking-[-4.8px] text-center pt-10 
                    text-red-600 
                    drop-shadow-[0_4px_4px_rgba(0,0,0,0.4)]">
                    ĐÁNH GIÁ CỦA KHÁCH HÀNG
                </strong>
            </div>
            <div className="w-full">
                {/* <!-- Best comment --> */}
                <div className="w-full flex justify-center lg:my-16 my-8">
                    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
                        <div className="relative w-full overflow-hidden">
                            {/* Desktop Side Content */}
                            <div className="hidden lg:block lg:w-full">
                                <div className="bg-[#cfa84c] text-white rounded-2xl lg:h-full w-full flex flex-col items-center gap-y-[23px] lg:px-10 lg:pt-[42px] lg:pb-[39px]">
                                    <strong className="lg:font-bold font-normal lg:text-[32px] text-[24px] text-center lg:tracking-[-1.75px] lg:leading-[38px] w-full">
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
                                                        fill="#FFD700"
                                                        stroke="#FFD700"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="text-yellow-400"
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
                            <div className="w-full sm:w-[1200px]">
                                <Swiper
                                    slidesPerView={3}
                                    spaceBetween={10}
                                    autoplay={{
                                        delay: 2000,
                                    }}
                                    modules={[Autoplay]}
                                    className="mySwiper"
                                >
                                    {[
                                        {
                                            username: "Alice Nguyen",
                                            rating: 5,
                                            comment: "The product quality is excellent, and delivery was fast. Will definitely buy again!",
                                            date: "2 days ago"
                                        },
                                        {
                                            username: "John Tran",
                                            rating: 5,
                                            comment: "Absolutely love it! Fits perfectly and is very comfortable.",
                                            date: "1 week ago"
                                        },
                                        {
                                            username: "Emily Le",
                                            rating: 5,
                                            comment: "It's okay, but I expected a bit more for the price. Still satisfied overall.",
                                            date: "3 days ago"
                                        },
                                        {
                                            username: "Michael Pham",
                                            rating: 5,
                                            comment: "Good value for the price. The design is also quite stylish.",
                                            date: "5 days ago"
                                        },
                                        {
                                            username: "Linda Vo",
                                            rating: 5,
                                            comment: "Amazing product! Great quality and fast shipping. Highly recommend!",
                                            date: "1 day ago"
                                        },
                                        {
                                            username: "Tienminh",
                                            rating: 6,
                                            comment: "The product quality is excellent, and delivery was fast. Will definitely buy again!",
                                            date: "1 day ago"
                                        }
                                    ].map((review, index) => (
                                        <SwiperSlide key={index} className="p-4">
                                            <div className="rounded-xl border p-6 flex flex-col justify-between bg-white shadow-lg h-[250px]">
                                                {/* User Info */}
                                                <div className="flex items-center gap-[16px]">
                                                    <div className="w-[36px] h-[36px] rounded-full bg-[#F6F0E2] flex items-center justify-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="#cfa84c"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="text-[#cfa84c]"
                                                        >
                                                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                                            <circle cx="12" cy="7" r="4" />
                                                        </svg>
                                                    </div>
                                                    <span className="font-medium">{review.username}</span>
                                                </div>
                                                <hr className="my-4" />
                                                {/* Comment */}
                                                <div className="flex flex-col h-full justify-center items-start gap-y-4">
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(review.rating)].map((_, i) => (
                                                            <svg
                                                                key={i}
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 24 24"
                                                                fill="#FFD700"
                                                                stroke="#FFD700"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                className="text-yellow-400"
                                                            >
                                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <p className="text-sm text-gray-700 line-clamp-3">{review.comment}</p>
                                                </div>
                                                <strong className="text-left text-[#9D9EA2] text-sm mt-4">{review.date}</strong>
                                            </div>
                                        </SwiperSlide>
                                    ))}
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
