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
    <div
      className="pt-64 pb-32 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage:
          'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url(/tourheader.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="py-8 space-y-8 md:container md:mx-auto ">
        <div className="flex flex-wrap items-center justify-center gap-8">
          {(data.length == 0 ? Array(6).fill({}) : data).map((item, index) => {
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
      </div>
    </div>
  );
}

export default CampaignTours;
