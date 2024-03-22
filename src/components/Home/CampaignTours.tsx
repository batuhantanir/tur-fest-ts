'use client';
import { useEffect, useState } from 'react';
import service from '@/lib/axios';
import ToursHorizontalCard from './ToursHorizontalCard';
import { Tour } from '@/types/tour';
import { Skeleton } from '../ui/skeleton';

function CampaignTours() {
  const [data, setData] = useState<Tour[]>([]);

  useEffect(() => {
    service
      .get('/tours/list?limit=3&campaign=true')
      .then((res) => {
        setData(res.data.data?.tours || []);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  return (
    <div className="py-8 space-y-8 md:container md:mx-auto">
      <h1 className="text-xl font-semibold text-center">KAMPANYALI TURLAR</h1>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {(data.length == 0 ? Array(3).fill({}) : data).map((item, index) => {
          if (data.length < 3 && data.length > 0) {
            const length = 3 - data.length;
            setData((prev) => [...prev, ...Array(length).fill({})]);
          }
          return (
            <>
              {item?.name ? (
                <ToursHorizontalCard key={index} item={item} />
              ) : (
                <div className="bg-white flex flex-col justify-between rounded-md shadow-md transition-shadow hover:shadow-xl mx-5 sm:mx-0 min-w-[305px] w-[335px] min-h-[512px]">
                  <div className="w-full h-52">
                    <Skeleton className="rounded-t-md w-full h-full" />
                  </div>
                  <div className="p-5 space-y-3 flex-1 flex flex-col">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <div className="flex justify-between items-center mt-2">
                      <Skeleton className="h-8 w-1/4" />
                      <Skeleton className="h-6 w-1/4" />
                    </div>
                  </div>
                  <div className="w-full flex justify-around px-5 py-3">
                    <Skeleton className="h-6 w-1/6" />
                    <Skeleton className="h-6 w-1/6" />
                    <Skeleton className="h-6 w-1/6" />
                  </div>
                  <div className="py-3">
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default CampaignTours;
