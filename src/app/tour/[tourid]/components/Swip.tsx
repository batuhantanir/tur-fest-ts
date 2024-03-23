'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import { useMediaQuery } from '@uidotdev/usehooks';
import { Swiper as ThumbSwip } from 'swiper/types';

interface SwipProps {
  tourImage: string[];
}

export default function Swip({ tourImage = [] }: SwipProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isPhone = useMediaQuery('(max-width: 500px)');
  const [thumbsSwiper, setThumbsSwiper] = useState<ThumbSwip | null>(null);

  function handleSwiper(swiper: ThumbSwip) {
    setThumbsSwiper(swiper);
  }

  if (!tourImage) return <div>loading</div>;

  return (
    <div
      className={`flex max-w-[1000px] w-full h-fit flex-col md:flex-row gap-[5px] md:gap-[10px] `}
    >
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-full h-56 sm:h-[450px] relative rounded-sm"
      >
        {(tourImage as string[])?.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="">
              <Image
                className="object-cover rounded-sm"
                src={`https://emur.dev/images/${image}`}
                fill
                loading="lazy"
                alt={'tur resmi'}
              />
            </div>
          </SwiperSlide>
        ))}
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
        {(tourImage as string[])?.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="">
              <Image
                className="object-cover rounded-sm"
                src={`https://emur.dev/images/${image}`}
                fill
                loading="lazy"
                alt={'tur resmi'}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
