'use client';
import { useEffect, useState } from 'react';
import service from '@/lib/axios';
import ToursHorizontalCard from './ToursHorizontalCard';
import { Tour } from '@/types/tour';

function CampaignTours() {
  const [data, setData] = useState<Tour[]>([]);

  useEffect(() => {
    service
      .get('/tours/list?limit=3&campaign=true')
      .then((res) => {
        setData(res.data.data?.tours || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="py-8 space-y-8 md:container md:mx-auto">
      <h1 className="text-xl font-semibold text-center">KAMPANYALI TURLAR</h1>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {data ? (
          data.map((item, index) => (
            <ToursHorizontalCard key={index} item={item} />
          ))
        ) : (
          <div>Herhangi bir tur bulunamadı</div>
        )}
      </div>
    </div>
  );
}

export default CampaignTours;
