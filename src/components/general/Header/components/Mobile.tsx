'use client';
import { cn } from '@/lib/utils';
import { navLinks } from '@/mocks/header';
import { useAuthStore } from '@/store/useAuthStore';
import React, { useEffect, useRef, useState } from 'react';
import Hamburger from './Hamburger';
import LinkButton from './LinkButton';
import { useMediaQuery } from '@/lib/useMediaQuery';

interface MobileProps {
  children: React.ReactNode;
}

function Mobile({ children }: MobileProps) {
  const navbarRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openNavbar, setOpenNavbar] = useState(false);

  const { logout, isAuthenticated } = useAuthStore();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        setOpenNavbar(false);
      }
    };
    openNavbar && isMobile
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [navbarRef, isMobile, openNavbar, hamburgerRef]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isMobile && (
        <>
          <Hamburger
            openNavbar={openNavbar}
            setOpenNavbar={setOpenNavbar}
            hamburgerRef={hamburgerRef}
          />
          <div
            ref={navbarRef}
            className={`text-white top-0 left-0  bg-cst-primary text-xl font-bold  brightness-90 transition-transform duration-300 md:duration-0 p-5 md:p-0 fixed md:relative h-full min-w-[280px] md:h-fit z-[110] md:z-0 ${
              openNavbar
                ? 'translate-x-0'
                : 'translate-x-[-120%] md:translate-x-0'
            }`}
          >
            <div className="w-full h-16"></div>
            <nav className="flex flex-col md:hidden md:flex-row gap-3 md:gap-6 py-2 px-5 ">
              {navLinks.map((link, index) => (
                <LinkButton
                  href={typeof link.href == 'string' ? link.href : link.href[0]}
                  onClick={() => setOpenNavbar(false)}
                  key={index}
                  icon={link.icon}
                >
                  {link.text}
                </LinkButton>
              ))}
            </nav>
            {!isLoading && (
              <div className="flex flex-col items-start gap-1 px-5 mb-5 md:hidden ">
                {children}
              </div>
            )}
          </div>
          <div
            className={cn(
              'bg-black/50 transition-opacity duration-400 w-full top-0 left-0  h-full relative opacity-0',
              {
                'z-[100] opacity-100 md:opacity-0 fixed ': openNavbar,
              }
            )}
          ></div>
        </>
      )}
    </>
  );
}

export default Mobile;
