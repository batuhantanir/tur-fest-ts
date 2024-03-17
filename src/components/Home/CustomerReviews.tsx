'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Autoplay } from 'swiper/modules';
import { BiSolidMessageRounded } from 'react-icons/bi';
import { FaStar, FaRegStar } from 'react-icons/fa6';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
//Mock
import { costumerReviewsData } from '@/mocks/costumerReviews';

interface ItemProps {
  name: string;
  starPoint: number;
  comment: string;
  id: number;
}

function CustomerReviews() {
  return (
    <div className="bg-cst-primary">
      <div className=" py-12 space-y-8 ">
        <h2 className="text-sm text-white text-center py-2 md:text-xl font-bold">
          Müşteri memnuniyeti bizim için çok önemlidir
        </h2>
        <Swiper
          direction={'horizontal'}
          modules={[Autoplay]}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          slidesPerView="auto"
          speed={6000}
          loop={true}
          centeredSlides={true}
          grabCursor={true}
          className="relative w-full h-[150px] md:h-[230px] lg:h-[230px] xl:h-[230px] drop-shadow-lg shadow-black"
        >
          {(costumerReviewsData as ItemProps[]).map((item) => (
            <SwiperSlide
              key={item.id}
              className="max-w-[500px] mx-4 rounded-lg relative flex flex-col px-5 justify-center py-1 md:py-5 items-center h-full bg-white "
            >
              <div className="flex justify-between">
                <h3 className=" text-sm sm:text-lg py-4 font-bold text-black">
                  {item.name}
                </h3>
                <div className="flex items-center md:px-5">
                  {Array.from({ length: 5 }, (_, i: number) => (
                    <span key={i}>
                      {i < item.starPoint ? (
                        <FaStar className="fill-amber-400 size-4 sm:size-6" />
                      ) : (
                        <FaRegStar className="fill-gray-400 size-4 sm:size-6" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs  sm:text-base text-black px-1">
                {item.comment}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default CustomerReviews;
