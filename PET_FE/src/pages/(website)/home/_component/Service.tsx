import { IService } from "@/common/type/IService";
import instance from "@/configs/axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';
const ServicePage = () => {
    const { data } = useQuery({
        queryKey: ['service'],
        queryFn: () => instance.get(`/service`)
    })
    console.log(data?.data);
    return (
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Header */}
            <header className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-red-600 sm:text-4xl pb-4">
                    Tạp chí thú cưng 
                </h2>
                <p className="text-gray-700 text-xl">
                    Những thông tin hữu ích về chăm sóc thú cưng và những tin tức mới nhất về thú cưng.
                </p>
            </header>

            {/* Main Service Article */}
            <article className="mb-12 flex flex-col sm:flex-row bg-white rounded-lg shadow-lg transition hover:shadow-xl overflow-hidden">
                <div className="sm:basis-1/3">
                    <img
                        alt="Pet Care"
                        src="https://img.pikbest.com/wp/202345/cat-dog-pet-and-pets-in-real-pictures-wallpapers_9596134.jpg!w700wp"
                        className="h-full w-full object-cover transition duration-500"
                    />
                </div>
                <div className="flex-1 p-6">
                    <h3 className="text-xl font-bold uppercase text-gray-800 mb-2">
                        Với những thông tin hữu ích về chăm sóc thú cưng
                    </h3>
                    <p className="text-xl text-gray-600 mb-4">
                        Khám phá các bí quyết chăm sóc thú cưng từ A đến Z, bao gồm cách lựa chọn thức ăn dinh dưỡng phù hợp, thiết lập môi trường sống an toàn, và những lưu ý quan trọng trong việc chăm sóc sức khỏe. Hãy đồng hành cùng chúng tôi để hiểu rõ hơn về nhu cầu của từng loại thú cưng, giúp chúng luôn khỏe mạnh và hạnh phúc.
                    </p>
                    <div className="text-right">
                        <Link
                            to={'/petmagazine'} 
                            className="bg-yellow-400 px-4 py-2 text-xs font-semibold uppercase text-gray-900 rounded-md transition hover:bg-yellow-500"
                        >
                            Xem Chi Tiết
                        </Link>
                    </div>
                </div>
            </article>

            {/* Service Items Section */}
            <Swiper
                slidesPerView={3} // điều chỉnh số lượng slide mỗi lần hiển thị
                spaceBetween={20} // khoảng cách giữa các slide
                autoplay={{
                    delay: 2000,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
            >
                {data?.data.map((item: IService) => (
                    <SwiperSlide key={item._id}> {/* Thêm `key` để tối ưu hiệu suất */}
                        <div className="relative overflow-hidden rounded-lg shadow-md transition duration-500 hover:shadow-lg group">
                            <img
                                src={item.galleryService[0]}
                                alt={item.servicesName}
                                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                <h3 className="text-lg font-semibold text-white">{item.servicesName}</h3>

                                <Link to={`/Detailservice/${item._id}`}>
                                    <span className="mt-2 inline-block bg-black px-4 py-2 text-xs font-medium uppercase text-white">
                                        Xem Chi Tiết
                                    </span>
                                </Link>

                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    );
};

export default ServicePage;
