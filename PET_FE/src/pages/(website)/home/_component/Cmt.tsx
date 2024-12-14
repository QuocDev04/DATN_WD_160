import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from 'swiper/modules';
import { useQuery } from "@tanstack/react-query";
import instance from "@/configs/axios";
import { 
    Star, 
    Quote,
    MessageCircle,
    Users,
    ThumbsUp,
    UserCircle2
} from 'lucide-react';

const CmtPages = () => {
    const { data } = useQuery({
        queryKey: ['evaluate'],
        queryFn: () => instance.get('/evaluate')
    });

    const comments = data?.data || [];

    return (
        <section className="py-20 bg-white">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto px-4 mb-16">
                <div className="text-center">
                    <MessageCircle className="w-16 h-16 text-[#cfa84c] mx-auto mb-4" />
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Đánh Giá Từ Khách Hàng
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Khám phá những trải nghiệm thực tế từ khách hàng đã sử dụng dịch vụ của chúng tôi
                    </p>
                </div>
            </div>

            {/* Stats Card */}
            <div className="max-w-7xl mx-auto px-4 mb-16">
                <div className="bg-gradient-to-r from-[#cfa84c] to-[#e2c17e] rounded-2xl p-8 text-white">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <Star className="w-10 h-10 mx-auto mb-4" fill="white" />
                            <h3 className="text-3xl font-bold mb-2">4.9/5</h3>
                            <div className="flex justify-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} fill="white" size={20} />
                                ))}
                            </div>
                            <p className="text-sm opacity-90">Đánh giá trung bình</p>
                        </div>
                        <div className="text-center">
                            <Users className="w-10 h-10 mx-auto mb-4" />
                            <h3 className="text-3xl font-bold mb-2">1,200+</h3>
                            <p className="text-sm opacity-90">Khách hàng hài lòng</p>
                        </div>
                        <div className="text-center">
                            <ThumbsUp className="w-10 h-10 mx-auto mb-4" />
                            <h3 className="text-3xl font-bold mb-2">98%</h3>
                            <p className="text-sm opacity-90">Khuyến nghị tích cực</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Slider */}
            <div className="max-w-7xl mx-auto px-4">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Autoplay, Navigation]}
                    className="review-swiper"
                >
                    {comments.map((review: any, index: number) => (
                        <SwiperSlide key={index}>
                            <div className="bg-gray-50 rounded-xl p-8 h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative">
                                        {review?.user?.avatar ? (
                                            <div className="w-14 h-14 rounded-full bg-[#cfa84c] flex items-center justify-center">
                                                <UserCircle2 className="w-8 h-8 text-white" />
                                            </div>
                                        ) : (
                                            <div className="w-14 h-14 rounded-full bg-[#cfa84c] flex items-center justify-center text-white text-xl">
                                                {review?.user?.name?.[0]}
                                            </div>
                                        )}
                                        <Quote className="absolute -bottom-2 -right-2 text-[#cfa84c] bg-white rounded-full p-1" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{review?.user?.name}</h4>
                                        <p className="text-sm text-gray-500">
                                            {new Date(review.createdAt).toLocaleDateString('vi-VN', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-1 mb-4">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            size={16} 
                                            className="text-[#cfa84c]" 
                                            fill="#cfa84c"
                                        />
                                    ))}
                                </div>

                                <p className="text-gray-700 leading-relaxed">
"{review.description}"
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default CmtPages;