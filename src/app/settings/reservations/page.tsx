'server-only';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import SettingsContainer from '@/components/settings/SettingsContainer';

export const TurnBack = () => {
  return (
    <Link
      href="/settings"
      className="flex md:hidden items-center w-full justify-center py-2 cursor-pointer"
    >
      <IoIosArrowBack className="h-6 w-6 text-ilki" />
      <span className=" text-ilki mr-2">Geri dön</span>
    </Link>
  );
};

function Reservations() {
  return (
    <SettingsContainer pathname="/settings/reservations">
      <div className="px-6 flex h-[400px] flex-col gap-5 py-5">
        <h1 className="border-b py-3 pl-1 border-[#E4E4E7]">Rezervasyonlar</h1>
        <p>Kayıtlı rezervasyonunuz bulunmamaktadır.</p>
      </div>
      <TurnBack />
    </SettingsContainer>
  );
}

export default Reservations;
