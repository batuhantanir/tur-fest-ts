'use client';
import React from 'react';

function Loading() {
  React.useEffect(() => {
    import('@lottiefiles/lottie-player');
  });

  return (
    <div className="flex items-center justify-center w-full min-h-full flex-1">
      <div className="relative w-[300px] h-[300px]">
        <lottie-player
          autoplay
          loop
          src="/loading.json"
          style={{ height: '300px', width: '300px' }}
          alt="Loading"
        />
        <h2 className="sr-only">Loading</h2>
      </div>
    </div>
  );
}

export default Loading;
