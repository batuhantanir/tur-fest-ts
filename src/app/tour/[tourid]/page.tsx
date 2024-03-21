'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
//Icons
import { FaChevronRight } from 'react-icons/fa6';
import { NextPageProps } from '@/types/tour';
//COMPONENTS
import Swip from './components/Swip';
import Loading from '@/app/loading';
import NotFound from '@/app/not-found';
import CstAccordion from './components/CstAccordion';
import { Tour } from '@/types/tour';
import Table from './components/Table';
//Utils
import service from '@/lib/axios';
import TourInformation from './components/TourInformation';

function TourDetail({ params }: NextPageProps) {
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    service
      .get('/tours/get/' + params.tourid)
      .then(function (res) {
        setTour(res.data.data.tour);
        setLoading(true);
      })
      .catch(function (err) {
        alert(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.tourid]);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;
  else if (!tour) return <NotFound />;

  return (
    <div className=" md:container md:mx-auto">
      <div className="flex flex-col mx-5">
        <div>
          <div className="flex flex-nowrap items-center gap-2 pb-5 text-sm mt-5 sm:mt-2 sm:text-base">
            <Link href="/tours" className="text-gray-500 hover:text-black">
              Turlar
            </Link>
            <span className="fill-cst-primary text-cst-primary ">
              <FaChevronRight />
            </span>
            <h3>{tour.name}</h3>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 pb-5 border-b h-fit">
            <div className=" w-full lg:w-3/5 h-fit">
              <Swip tourImage={tour.images} />
            </div>
            <TourInformation tour={tour} />
          </div>
        </div>
        <div className="my-5">
          <div className="py-7 md:px-5 rounded-sm space-y-4 ">
            <Table
              price_includes={tour.price_includes}
              price_excludes={tour.price_excludes}
            />
          </div>
        </div>
        <CstAccordion tour_plan={tour.tour_plan} />
      </div>
    </div>
  );
}

export default TourDetail;
