import 'server-only';
import React from 'react';
import Image from 'next/image';
import IconBoxWrapper, { IconBox } from '@/components/IconBoxs';
import { timeStamp } from '@/lib/utils';
import { FaRegClock, FaBus, FaLocationArrow } from 'react-icons/fa';
import { FaPlane } from 'react-icons/fa6';
import PriceSchema from '../general/priceSchema';
import CostumButton from '../CostumButton';

function ToursHorizontalCard({ item }) {
  const time = timeStamp(item.begin_date, item.end_date);
  const date = new Date(item.begin_date);
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const beginDate = `${day}.${month < 10 ? '0' + month : month}.${year}`;

  return (
    <div className="bg-white  rounded-md shadow-md mx-5 sm:mx-0 min-w-[305px] w-[335px]  h-fit">
      <div className="w-full h-52 relative ">
        <Image
          src={`https://emur.dev/images/${item.images && item.images[0]}`}
          loading="lazy"
          className="rounded-t-md object-cover"
          fill
          sizes="100vw"
          quality={100}
          alt={`${item.name}`}
        />
      </div>
      <div className="p-5 space-y-3 ">
        <h1 className="text-xl font-bold mt-2">{item.name}</h1>
        <p className="text-sm mt-2 line-clamp-4">{item.description}</p>
        <div className="flex justify-between items-center">
          <CostumButton
            href={`tour/${item._id}`}
            className=" whitespace-nowrap bg-cst-primary  rounded-sm 
                        px-3  text-white scale-95
                          hover:bg-white hover:text-cst-primary
                        transition-all duration-200 ease-in-out
                        active:scale-90 py-1"
          >
            Turu incele
          </CostumButton>
          <PriceSchema
            tour={item}
            discountStyle={'text-xs text-end px-0.5 py-0.5'}
          />
        </div>
      </div>
      <IconBoxWrapper className="w-full border-y justify-around px-5">
        <IconBox icon={FaRegClock} text={time} />
        <IconBox
          icon={item.vehicle == 1 ? FaBus : FaPlane}
          text={item.vehicle == 1 ? 'Otobüs' : 'Uçak'}
        />
        <IconBox icon={FaLocationArrow} text={item.city} />
      </IconBoxWrapper>
      <div className="py-3">
        <p className="text-center text-xs">
          Tur başlangıç tarihi:{' '}
          <span className="font-semibold">{beginDate}</span>{' '}
        </p>
      </div>
    </div>
  );
}

export default React.memo(ToursHorizontalCard);
