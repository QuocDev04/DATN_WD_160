// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
const Banner = () => {
    return (
        <div className=" mx-auto px-4">
            <Swiper
                spaceBetween={30}
                effect={'creative'}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                creativeEffect={{
                    prev: {
                        translate: [0, 0, -400],
                    },
                    next: {
                        translate: ['100%', 0, 0],
                    },
                }}
                modules={[EffectFade, Navigation, Pagination, Autoplay]}
                className="custom-swiper mySwiper"  // Thêm class custom-swiper
                style={{ 
                    height: '600px',
                    width: '1500px',
                    margin: '0 auto'
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 1,
                        spaceBetween: 40,
                    },
                }}
            >
                <SwiperSlide>
                    <img src="./Pet_hotel.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://theme.hstatic.net/1000238938/1000576591/14/slider_index_1_3.jpg?v=386" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://theme.hstatic.net/1000238938/1000576591/14/slider_index_1_4.jpg?v=386" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://theme.hstatic.net/1000238938/1000576591/14/slider_index_1_5.jpg?v=386" alt="" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
