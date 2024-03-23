'use client';
import Link from 'next/link';
import React from 'react';
import { FaPhoneFlip } from 'react-icons/fa6';

function PhoneButton() {
  return (
    <div className="group ml-1  active:scale-105 bottom-3 right-3 md:bottom-20 bg-gray-500 md:bg-transparent md:right-auto md:hidden flex items-center justify-center rounded-sm md:rounded-full px-3 py-2 w-full md:w-10  h-14 md:h-10 transition duration-200 z-[90]">
      <Link
        className="flex md:block gap-2 sm:gap-3 items-center"
        href="tel:+905059956402"
      >
        <FaPhoneFlip
          className="stroke-[1.5] block md:hidden transition-all duration-200 size-[15px] sm:size-[18px] hover:size-[50px] md:size-[40px] text-white"
          size={18}
        />
        <span className="block md:hidden  font-medium text-sm sm:text-base text-white whitespace-nowrap">
          0505 995 64 02
        </span>
      </Link>
    </div>
  );
}

export default PhoneButton;
