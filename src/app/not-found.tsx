'use client';
import Link from 'next/link';
import React from 'react';

function NotFound() {
  React.useEffect(() => {
    import('@lottiefiles/lottie-player');
  });

  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full min-h-full flex-1 py-10">
      <div className="relative w-[200px] h-[150px] sm:w-[300px] sm:h-[230px]">
        <lottie-player
          autoplay
          loop
          src="/not-found.json"
          fill
          alt="Sayfa Bulunamadı 404"
        />
        <h2 className="sr-only">Loading</h2>
      </div>
      <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-bold">
          404 - Sayfa Bulunamadı
        </h1>
        <p className="text-base sm:text-lg px-5 sm:px-0">
          Aradığınız sayfa bulunamadı. Lütfen ana sayfaya dönün.
        </p>
      </div>
      <button className="bg-blue-500 hover:bg-blue-500/90 transition-colors duration-200 py-2 px-4 text-white rounded-lg">
        <Link href="/">Ana Sayfaya Dön</Link>
      </button>
    </div>
  );
}

export default NotFound;
