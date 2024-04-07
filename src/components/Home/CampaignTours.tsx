'use client';
import { useEffect, useState } from 'react';
import service from '@/lib/axios';
import ToursHorizontalCard, {
  ToursHorizontalCardSkeleton,
} from './ToursHorizontalCard';
import { Tour } from '@/types/tour';

function CampaignTours() {
  const [data, setData] = useState<Tour[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    service
      .get('/tours/list?limit=6&campaign=true')
      .then((res) => {
        setData(res.data.data?.tours || []);
      })
      .catch((err) => {
        // console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="pb-8 pt-24 space-y-8 md:container md:mx-auto">
      <h1 className="text-center text-black text-2xl font-semibold">
        KAMPANYALI TURLAR
      </h1>
      <div className="py-8 space-y-8 md:container md:mx-auto ">
        <div className="flex flex-wrap items-center justify-center gap-8">
          {(data.length == 0 ? Array(4).fill({}) : data).map((item, index) => {
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
            href="/tours?campaign=true"
            className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Tümünü Gör
          </a>
        </div>
      </div>
    </div>
  );
}

export default CampaignTours;
