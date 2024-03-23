import Link from 'next/link';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';

function WhatsappButton() {
  return (
    <div className="group md:fixed active:scale-105 bottom-3  left-3 md:bottom-20 bg-green-500 md:bg-transparent md:left-auto md:right-5 flex items-center justify-center rounded-sm md:rounded-full px-3 py-2 w-full md:w-10  h-14 md:h-10 transition duration-200 z-[90]">
      <Link
        className="flex md:block gap-2 sm:gap-3 items-center"
        href="https://wa.me/+905059956402"
      >
        <FaWhatsapp
          className="stroke-[1.5] block md:hidden transition-all size-[20px] sm:size-[24px] duration-200 hover:size-[50px] md:size-[40px] text-white"
          size={24}
        />
        <IoLogoWhatsapp
          className="stroke-[1.5] hidden md:block transition-all duration-200 hover:size-[50px] text-green-500  "
          size={40}
        />
        <span className="block md:hidden  font-medium text-sm sm:text-base text-white whitespace-nowrap">
          WhatsApp
        </span>
      </Link>
    </div>
  );
}

export default WhatsappButton;
