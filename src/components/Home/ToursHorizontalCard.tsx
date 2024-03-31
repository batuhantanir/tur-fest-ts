import React from 'react';
import PriceSchema, { convertTL } from '@/components/general/priceSchema';
import CostumButton from '@/components/CostumButton';
import { Tour } from '@/types/tour';
import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

interface ToursHorizontalCardProps {
  item: Tour;
}

function ToursHorizontalCard({ item }: ToursHorizontalCardProps) {
  return (
    <div
      onClick={() => {
        window.location.href = `tour/${item._id}`;
      }}
      className="bg-white relative flex flex-col md:grid grid-cols-6  rounded-md shadow-md transition-shadow hover:shadow-xl mx-5 sm:mx-0 w-[520px] min-h-[220px] cursor-pointer group"
    >
      <div className="w-full overflow-hidden rounded-t-md md:rounded-l-md col-span-3">
        <img
          src={`https://emur.dev/images/${item.images && item.images[0]}`}
          loading="lazy"
          className=" object-cover h-[220px] w-full group-hover:scale-105 group-hover:brightness-90 transition-all duration-300 ease-in-out"
          alt={`${item.name}`}
        />
      </div>
      <div className="md:py-3 p-5 md:pl-3 md:pr-4 space-y-2.5 col-start-4 flex flex-col  w-full col-span-3">
        <h1 className="text-lg font-bold mt-1.5 group-hover:underline">
          {item.name}
        </h1>
        <p className="text-sm  line-clamp-4 flex-1">{item.description}</p>
        <div className="flex justify-between items-center">
          <CostumButton
            href={`tour/${item._id}`}
            className="whitespace-nowrap bg-cst-primary rounded-sm px-3  text-white scale-95 hover:bg-white hover:text-cst-primary transition-all duration-200 ease-in-out active:scale-90 py-1"
          >
            Turu incele
          </CostumButton>
          {item.price.campaign_exists ? (
            <div className={`flex gap-2}`}>
              <div className={`flex flex-col order-2}`}>
                <span className="text-sm line-through text-muted-foreground">
                  {convertTL(item.price.normal_price)}
                </span>
                <span className="">{convertTL(item.price.last_price)}</span>
              </div>
            </div>
          ) : (
            <span>{convertTL(item.price.last_price)}</span>
          )}
        </div>
      </div>
      {item.price.campaign_exists && (
        <div
          className={cn(
            'absolute h-fit w-fit border-[1.5px] group-hover:scale-[1.02] transition-all duration-200 ease-in-out border-dashed font-medium  border-cst-primary bg-white/70 text-cst-primary text-xs text-end px-1 py-1 top-2 left-2 rounded-sm'
          )}
        >
          {item.price.campaign_discount + '% indirim'}
        </div>
      )}
    </div>
  );
}

export default React.memo(ToursHorizontalCard);

export const ToursHorizontalCardSkeleton = () => {
  return (
    <div className="bg-white relative flex flex-col md:grid grid-cols-6  rounded-md shadow-md transition-shadow  mx-5 sm:mx-0 w-[520px] min-h-[220px] cursor-pointer ">
      <div className="w-full overflow-hidden rounded-t-md md:rounded-l-md col-span-3">
        <Skeleton className="h-[220px] w-full" />
      </div>
      <div className="md:py-5 p-5 md:pl-3 md:pr-4 space-y-2.5 col-start-4 flex flex-col  w-full col-span-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex-1 space-y-2 pt-1">
          <Skeleton className="h-4 w-full " />
          <Skeleton className="h-4 w-full " />
          <Skeleton className="h-4 w-2/3 " />
        </div>
        <div className="flex justify-between items-center  flex-end">
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-6 w-1/4" />
        </div>
      </div>
    </div>
  );
};
