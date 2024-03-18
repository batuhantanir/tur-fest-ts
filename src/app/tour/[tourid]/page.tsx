'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
//Icons
import { FaChevronRight } from 'react-icons/fa6';
import { FaRegClock, FaBus, FaPlane, FaLocationArrow } from 'react-icons/fa';
import { NextPageProps } from '@/types/tour';
//COMPONENTS
import CostumButton from '@/components/CostumButton';
import Swip from './components/Swip';
import IconBoxWrapper, { IconBox } from '@/components/IconBoxs';
import Loading from '@/app/loading';
import NotFound from '@/app/not-found';
import { Tour } from '@/types/tour';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import PriceSchema from '@/components/general/priceSchema';
import Table from './components/Table';
//Utils
import { timeStamp } from '@/lib/utils';
import service from '@/lib/axios';

function convertKeywordsToString(keywords: string[]) {
  return keywords.map((keyword, idx) =>
    keywords.length - 1 !== idx ? keyword + ', ' : keyword
  );
}

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

  const tourTime = timeStamp(tour.begin_date, tour.end_date);

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
            <div className="flex flex-col justify-between gap-3 w-full lg:w-2/5 min-h-full">
              <h3 className="font-semibold text-base md:text-xl">
                {tour.name}
              </h3>
              <p className="flex-1 line-clamp-[9]">{tour.description}</p>
              <div className="flex space-x-1.5 font-semibold">
                <span>Fiyat:</span>
                <PriceSchema price={tour.price} flex={true} />
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <CostumButton href="https://wa.me/+905059956402">
                  Rezervasyon Yap
                </CostumButton>
                <Link
                  href="https://wa.me/+905059956402"
                  className="whitespace-nowrap  underline underline-offset-3 "
                >
                  Sorunuz mu var?
                </Link>
              </div>
              <div className="bg-cst-primary w-full p-5 text-white rounded-sm ">
                <IconBoxWrapper className="justify-between gap-0">
                  <IconBox icon={FaRegClock} text={tourTime} />
                  <IconBox
                    icon={tour.vehicle == 'bus' ? FaBus : FaPlane}
                    text={tour.vehicle == 'bus' ? 'Otobüs' : 'Uçak'}
                  />
                  <IconBox icon={FaLocationArrow} text={tour.city} />
                </IconBoxWrapper>
              </div>
            </div>
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
        <div className="mb-16">
          <Accordion type="single" collapsible className="w-full">
            {tour.tour_plan.map((item, index) => (
              <AccordionItem key={index} value={(index + 1).toString()}>
                <AccordionTrigger>
                  <div>
                    <span>{index + 1 + '. GÜN: '}</span>
                    <span className="font-normal">
                      {convertKeywordsToString(item.keywords)}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-3">
                  {item.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default TourDetail;
