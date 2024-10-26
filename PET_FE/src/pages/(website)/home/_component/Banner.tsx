// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
const Banner = () => {
    return (
        <Swiper
            spaceBetween={30}
            effect={'fade'}
            navigation={true}
            pagination={{
                clickable: true,
            }}
            modules={[EffectFade, Navigation, Pagination]}
            className="mySwiper"
        >
            <SwiperSlide>
                <img src="https://theme.hstatic.net/1000238938/1000576591/14/slider_index_1_1.jpg?v=386" alt="" />
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
    );
};

export default Banner;
