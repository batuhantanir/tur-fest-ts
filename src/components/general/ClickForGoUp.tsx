'use client';
import React, { useEffect, useCallback, useState } from 'react';
import { PiPaperPlaneFill } from 'react-icons/pi';
import { cn } from '@/lib/utils';

function ClickToGoUp() {
  const [scroll, setScroll] = useState(0);
  const handleClick = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleScroll = useCallback(() => {
    setScroll(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={cn(
        'group hidden cursor-none md:flex opacity-0 fixed bottom-5 right-5 items-center justify-center rounded-full w-10 h-10 bg-[#05146E] group-hover:bg-[#05146E]/90 transition duration-200 shadow-black shadow-sm z-[90]',
        { 'opacity-100 cursor-pointer': scroll > 95 }
      )}
      onClick={handleClick}
    >
      <PiPaperPlaneFill
        size={20}
        className="text-white transition duration-500 group-hover:rotate-[360deg]"
      />
    </button>
  );
}

export default ClickToGoUp;
