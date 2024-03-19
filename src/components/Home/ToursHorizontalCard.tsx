import React from 'react';
import Image from 'next/image';
import IconBoxWrapper, { IconBox } from '@/components/IconBoxs';
import { timeStamp } from '@/lib/utils';
import { FaRegClock, FaBus, FaLocationArrow } from 'react-icons/fa';
import { FaPlane } from 'react-icons/fa6';
import PriceSchema from '@/components/general/priceSchema';
import CostumButton from '@/components/CostumButton';
import { Tour } from '@/types/tour';

interface ToursHorizontalCardProps {
  item: Tour;
}

function ToursHorizontalCard({ item }: ToursHorizontalCardProps) {
  const time = timeStamp(item.begin_date, item.end_date);
  const beginDate = Intl.DateTimeFormat('tr-TR', {}).format(
    new Date(item.begin_date)
  );

  return (
    <div className="bg-white flex flex-col justify-between  rounded-md shadow-md mx-5 sm:mx-0 min-w-[305px] w-[335px]  min-h-[512px]">
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
      <div className="p-5 space-y-3 flex-1 flex flex-col">
        <h1 className="text-xl font-bold mt-2">{item.name}</h1>
        <p className="text-sm mt-2 line-clamp-4 flex-1">{item.description}</p>
        <div className="flex justify-between items-center">
          <CostumButton
            href={`tour/${item._id}`}
            className="whitespace-nowrap bg-cst-primary rounded-sm px-3  text-white scale-95 hover:bg-white hover:text-cst-primary transition-all duration-200 ease-in-out active:scale-90 py-1"
          >
            Turu incele
          </CostumButton>
          <PriceSchema
            price={item.price}
            flex={true}
            reverse={true}
            discountStyle={'text-xs text-end px-0.5 py-0.5 '}
          />
        </div>
      </div>
      <IconBoxWrapper className="w-full border-y justify-around px-5">
        <IconBox icon={FaRegClock} text={time} />
        <IconBox
          icon={item.vehicle == 'bus' ? FaBus : FaPlane}
          text={item.vehicle == 'bus' ? 'Otobüs' : 'Uçak'}
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
