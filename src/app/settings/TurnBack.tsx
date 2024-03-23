import React from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import Link from 'next/link';

function TurnBack() {
  return (
    <Link
      href="/settings"
      className="flex md:hidden items-center w-full justify-center py-2 cursor-pointer"
    >
      <IoIosArrowBack className="h-6 w-6 text-ilki" />
      <span className=" text-ilki mr-2">Geri dön</span>
    </Link>
  );
}

export default TurnBack;
