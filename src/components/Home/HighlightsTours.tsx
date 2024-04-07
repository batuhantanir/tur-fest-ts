'use client';
import service from '@/lib/axios';
import { Tour } from '@/types/tour';
import { useEffect, useState } from 'react';
import ToursHorizontalCard, {
  ToursHorizontalCardSkeleton,
} from './ToursHorizontalCard';

function HighlightsTours() {
  const [data, setData] = useState<Tour[]>([]);

  useEffect(() => {
    service
      .get('/tours/list?limit=6&order_by=popular')
      .then((res) => {
        setData(res.data.data?.tours || []);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  return (
    <div className="py-8 space-y-8 md:container md:mx-auto">
      <h1 className="text-center text-black text-2xl font-semibold">
        ÖNE ÇIKAN TURLAR
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-8 ">
        {(data.length == 0 ? Array().fill({}) : data).map((item, index) => {
          return (
            <>
              {item?.name ? (
                <ToursHorizontalCard key={index} item={item} />
              ) : (
                <ToursHorizontalCardSkeleton key={index} />
              )}
            </>
          );
        })}
      </div>
      <div className="flex justify-center">
        <a
          href="/tours?order_by=popular"
          className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Tümünü Gör
        </a>
      </div>
    </div>
  );
}

export default HighlightsTours;
