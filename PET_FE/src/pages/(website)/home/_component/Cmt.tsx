import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from 'swiper/modules';
import { useQuery } from "@tanstack/react-query";
import instance from "@/configs/axios";
const CmtPages = () => {
    const { data } = useQuery({
        queryKey:['evaluate'],
        queryFn: () => instance.get('/evaluate')
    });

    const comments = data?.data || [];

    return (
        <div className="bg-gray-100 py-10">
            <img src="https://theme.hstatic.net/1000238938/1000576591/14/banner_collection.jpg?v=386" alt="" className="w-full rounded-lg shadow-lg" />
            <div className="lg:w-[948px] mx-auto flex justify-center">
                <strong className="lg:text-[50px] lg:leading-[70px] lg:tracking-[-4.8px] text-center text-[#333]">
                    NHẬN XÉT CỦA KHÁCH HÀNG
                </strong>
            </div>
            <div className="w-full">
                <div className="w-full flex justify-center lg:my-16 my-8">
                    <div className="flex justify-end overflow-hidden">
                        <div className="relative w-full overflow-hidden">
                            <div className="hidden lg:block">
                                <div className="bg-[#cfa84c] text-white rounded-2xl lg:h-full flex flex-col items-center gap-y-[23px] lg:px-10 lg:pt-[42px] lg:pb-[39px] shadow-lg">
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
                                    autoplay={{
                                        delay: 2000,
                                    }}
                                    modules={[Autoplay]}
                                    className="mySwiper"
                                >
                                    {comments.map((review:any, index:number) => (
                                        <SwiperSlide key={index} className="p-4">
                                            <div className="rounded-xl border p-6 flex flex-col justify-between bg-white shadow-lg h-[250px] transition-transform transform hover:scale-105 hover:shadow-2xl">
                                                {/* User Info */}
                                                <div className="flex items-center">
                                                    <img className="rounded-full w-10 h-10" src={review?.user?.avatar} />
                                                    <span className="font-medium text-lg text-[#333]">{review?.user?.name}</span>
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
                                                    <p className="text-sm text-gray-700 line-clamp-3">{review.description}</p>
                                                </div>
                                                <strong className="text-left text-[#9D9EA2] text-sm mt-4">{review.createdAt}</strong>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CmtPages;
