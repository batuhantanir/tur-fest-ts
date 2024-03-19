'use client';
import { useEffect, useState } from 'react';
import service from '@/lib/axios';
import ToursHorizontalCard from './ToursHorizontalCard';
import { Tour } from '@/types/tour';

async function HighlightsTours() {
  const [data, setData] = useState<Tour[]>([]);

  useEffect(() => {
    service
      .get('/tours/list?limit=3&order_by=popular')
      .then((res) => {
        setData(res.data.data?.tours || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="py-8 space-y-8 md:container md:mx-auto">
      <h1 className="text-center text-black text-xl font-semibold">
        ÖNE ÇIKAN TURLAR
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-8 ">
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

export default HighlightsTours;
