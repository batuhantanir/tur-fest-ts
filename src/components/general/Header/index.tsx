'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { useAuthStore } from '@/store/useAuthStore';

import Mobile from './components/Mobile';
import Desktop from './components/Desktop';

function Header() {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const pathname = usePathname();

  return (
    <>
      {pathname != '/' && <div className={'h-[74.75px] md:h-[114.75px]'}></div>}
      {/* Yer tutucu */}
      <Desktop
        {...{
          pathname,
          setOpenNavbar,
          setIsLoading,
          isLoading,
        }}
      />
      <Mobile
        openNavbar={openNavbar}
        setOpenNavbar={setOpenNavbar}
        isLoading={isLoading}
      />
    </>
  );
}

export default Header;
