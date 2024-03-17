'use client';
import React, { useEffect, useCallback, useState } from 'react';
import { PiPaperPlaneFill } from 'react-icons/pi';
import { twMerge } from 'tailwind-merge';

function ClickToGoUp() {
  const [scroll, setScroll] = useState(0);
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
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
      className={twMerge(
        'group hidden md:flex  fixed bottom-5 right-5 items-center justify-center rounded-full w-10 h-10 bg-[#05146E] group-hover:bg-[#05146E]/90 transition duration-200 shadow-black shadow-sm z-[90]',
        `${scroll > 95 ? 'opacity-100' : 'opacity-0 '}`
      )}
      onClick={handleClick}
    >
      <PiPaperPlaneFill
        size={20}
        className="text-white  transition duration-500 group-hover:rotate-[360deg]"
      />
    </button>
  );
}

export default ClickToGoUp;
