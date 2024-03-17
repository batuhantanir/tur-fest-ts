'use client'
import React, { useState } from 'react';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import { useMediaQuery } from '@/lib/useMediaQuery';

export default function Swip({ tourImage = [] }) {
    const isMobile = useMediaQuery(767);
    const isPhone = useMediaQuery(500);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    function handleSwiper(swiper) {
        setThumbsSwiper(swiper);
    }

    if (tourImage == []) return <div>loading</div>

    return (
        <div className={`flex max-w-[1000px] w-full h-fit flex-col md:flex-row gap-[5px] md:gap-[10px] `}>
            <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="w-full h-56 sm:h-[450px] relative rounded-sm"
            >
                {/* {console.log(tourImage)} */}
                {
                    tourImage?.map((image, index) => (
                        <SwiperSlide key={index} >
                            <div className=''>
                                <Image
                                    className='object-cover rounded-sm'
                                    src={`https://emur.dev/images/${image}`}
                                    fill
                                    loading='lazy'
                                    alt={"tur resmi"} />
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <Swiper
                onSwiper={handleSwiper}
                direction={isMobile ? 'horizontal' : 'vertical'}
                spaceBetween={isMobile ? 5 : 10}
                slidesPerView={isPhone ? 3 : 4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className={`w-full relative rounded-sm h-24 sm:h-36 md:h-[450px] md:w-36`}
            >
                {
                    tourImage?.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className=''>
                                <Image
                                    className='object-cover rounded-sm'
                                    src={`https://emur.dev/images/${image}`}
                                    fill
                                    loading='lazy'
                                    alt={"tur resmi"} />
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}
