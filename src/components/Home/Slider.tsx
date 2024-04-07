'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import Axios from '@/lib/axios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const Slider = () => {
  const [images, setImages] = React.useState<string[]>(['heroBg.jpg']);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    Axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/slider/homepage`)
      .then((res) => {
        setImages(res.data.data.images);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Swiper
        className="w-full h-[100dvh] max-h-[1080px] "
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {images.map((path, index) => (
          <SwiperSlide className="relative" key={index}>
            <img
              className="w-full h-full object-cover object-center brightness-75"
              src={
                path != 'heroBg.jpg'
                  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/images/${path}`
                  : '/heroBg.jpg'
              }
              draggable={false}
              alt="Picture of the author"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
