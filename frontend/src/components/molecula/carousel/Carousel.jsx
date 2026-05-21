import React from 'react'

import { EffectCards, Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-cards';
import "./carousel.css"
import { Img } from '../../../assets/Img';


export const Carousel = () => {
    return (
        <div className='w-64 sm:w-100 transition-w duration-100'>
            <Swiper
                // install Swiper modules
                effect={'cards'}
                grabCursor={true} // Mejora la UX al arrastrar
                autoplay={{ delay: 2500, disableOnInteraction: true }}
                modules={[EffectCards, Navigation, Pagination, A11y, Autoplay]}
                navigation={true}
            >
                <SwiperSlide>
                    <img src={Img.barras1} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={Img.personaCohete} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={Img.graficaCircular} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={Img.barras2} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={Img.personaGraficas} alt="" />
                </SwiperSlide>

            </Swiper>
        </div>
    )
}
