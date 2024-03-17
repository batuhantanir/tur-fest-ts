'use client';
import React from 'react';
import SettingsContainer from '@/components/settings/SettingsContainer';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';

function Reservations() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <>
      {!isMobile ? (
        <SettingsContainer>
          <div className="mx-auto container flex flex-col gap-5 py-5">
            <h1 className="border-b py-3 pl-1 border-[#E4E4E7]">
              Rezervasyonlar
            </h1>
            <p>Kayıtlı rezervasyonunuz bulunmamaktadır.</p>
          </div>
        </SettingsContainer>
      ) : (
        <div className="px-6 flex h-[400px] flex-col gap-5 py-5">
          <h1 className="border-b py-3 pl-1 border-[#E4E4E7]">
            Rezervasyonlar
          </h1>
          <p>Kayıtlı rezervasyonunuz bulunmamaktadır.</p>
          <Link
            href="/settings"
            className="flex items-center w-full justify-center py-2 cursor-pointer"
          >
            <IoIosArrowBack className="h-6 w-6 text-ilki" />
            <span className=" text-ilki mr-2">Geri dön</span>
          </Link>
        </div>
      )}
    </>
  );
}

export default Reservations;
