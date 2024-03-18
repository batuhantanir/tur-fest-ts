'use client';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { useAuthStore } from '@/store/useAuthStore';

import Mobile from './components/Mobile';
import Desktop from './components/Desktop';

function Header() {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const pathname = usePathname();
  const { logout, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    setIsLoading(false);
    setScrollY(window.scrollY);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollPoint = isMobile ? 55 : 55;

  return (
    <>
      {pathname != '/' && <div className={'h-[74.75px] md:h-[114.75px]'}></div>}
      {/* Yer tutucu */}
      <Desktop
        {...{
          scrollY,
          scrollPoint,
          pathname,
          isMobile,
          setOpenNavbar,
          isLoading,
          logout,
          isAuthenticated,
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
