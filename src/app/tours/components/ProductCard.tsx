import React from 'react';
import { FaLocationArrow, FaRegClock, FaBus, FaPlane } from 'react-icons/fa';
import Image from 'next/image';
import CostumButton from '@/components/CostumButton';
import IconBoxWrapper, { IconBox } from '@/components/IconBoxs';
import PriceSchema from '@/components/general/priceSchema';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

import { Tour } from '@/types/tour';
import { timeStamp } from '@/lib/utils';

interface ProductCardProps {
  products: Tour[];
}

function ProductCard({ products }: ProductCardProps) {
  return (
    <div className="space-y-3 lg:col-span-3">
      {products.map((product, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center w-full transition-shadow border rounded-lg shadow-md hover:shadow-lg md:items-stretch md:flex-row h-fit bg-gray-50 group hover:bg-gray-100"
        >
          <div className="relative w-full h-56 md:max-w-72 min-w-60  md:h-72 overflow-hidden">
            {product.images[0] ? (
              <img
                className="object-cover rounded-t-lg md:rounded-l-lg w-full h-full "
                src={`https://emur.dev/images/${product.images[0]}`}
                loading="lazy"
                alt={product.name ? product.name : 'tur resmi'}
              />
            ) : (
              <Skeleton className="w-full h-full bg-gray-200" />
            )}
          </div>
          <div className="flex flex-col justify-between w-full sm:flex-row">
            <div className="flex flex-col justify-between flex-1 px-5 pt-5 mr-3 sm:border-r md:p-5">
              <div className="pr-2.5 space-y-2">
                <Link href={`tour/${product._id}`}>
                  <div className="text-lg font-semibold cursor-pointer group-hover:underline">
                    {product.name}
                  </div>
                </Link>
                <div className="text-cst-description line-clamp-5">
                  {product.description}
                </div>
              </div>
              <IconBoxWrapper
                className={`flex-wrap gap-y-5 justify-between gap-x-0 md:gap-x-5`}
              >
                <IconBox
                  icon={FaRegClock}
                  text={timeStamp(product.begin_date, product.end_date)}
                />
                <IconBox
                  icon={product.vehicle == 'bus' ? FaBus : FaPlane}
                  text={product.vehicle == 'bus' ? 'Otobüs' : 'Uçak'}
                />
                <IconBox icon={FaLocationArrow} text={product.city} />
              </IconBoxWrapper>
            </div>
            <div className="flex items-center justify-between m-5 sm:flex-col sm:items-start gap-y-3 ">
              <div className="flex flex-col text-lg font-semibold">
                <PriceSchema price={product.price} />
              </div>
              <div className="flex items-center justify-center">
                <CostumButton
                  href={`tour/${product._id}`}
                  className="hover:text-white hover:bg-cst-primary hover:shadow-md hover:shadow-cst-primary"
                >
                  Turu incele
                </CostumButton>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default React.memo(ProductCard);
