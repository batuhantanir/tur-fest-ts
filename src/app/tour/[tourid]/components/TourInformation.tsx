import React from 'react';
import Link from 'next/link';
//Icons
import { FaRegClock, FaBus, FaPlane, FaLocationArrow } from 'react-icons/fa';
//COMPONENTS
import IconBoxWrapper, { IconBox } from '@/components/IconBoxs';
import CostumButton from '@/components/CostumButton';
import PriceSchema from '@/components/general/priceSchema';
//UTILS
import { timeStamp } from '@/lib/utils';
//TYPES
import { Tour } from '@/types/tour';

interface TourInformationProps {
  tour: Tour;
}

function TourInformation({ tour }: TourInformationProps) {
  const tourTime = timeStamp(tour.begin_date, tour.end_date);
  return (
    <div className="flex flex-col justify-between gap-3 w-full lg:w-2/5 min-h-full">
      <div className="font-semibold text-base md:text-xl">
        <h3>{tour.name}</h3>
        <div className="font-normal text-sm md:text-base">
          {Intl.DateTimeFormat('tr', { dateStyle: 'long' }).format(
            new Date(tour.begin_date)
          )}{' '}
          -{' '}
          {Intl.DateTimeFormat('tr', { dateStyle: 'long' }).format(
            new Date(tour.end_date)
          )}
        </div>
      </div>

      <p className="flex-1 line-clamp-[9]">{tour.description}</p>
      <div className="flex space-x-1.5 font-semibold">
        <span>Fiyat:</span>
        <PriceSchema price={tour.price} flex={true} />
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <CostumButton href="https://wa.me/+905059956402">
          Rezervasyon Yap
        </CostumButton>
        <Link
          href="https://wa.me/+905059956402"
          className="whitespace-nowrap  underline underline-offset-3 "
        >
          Sorunuz mu var?
        </Link>
      </div>
      <div className="bg-cst-primary w-full p-5 text-white rounded-sm ">
        <IconBoxWrapper className="justify-between gap-0">
          <IconBox icon={FaRegClock} text={tourTime} />
          <IconBox
            icon={tour.vehicle == 'bus' ? FaBus : FaPlane}
            text={tour.vehicle == 'bus' ? 'Otobüs' : 'Uçak'}
          />
          <IconBox icon={FaLocationArrow} text={tour.city} />
        </IconBoxWrapper>
      </div>
    </div>
  );
}

export default TourInformation;
