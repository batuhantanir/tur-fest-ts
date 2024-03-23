'use client';
import React from 'react';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useRouter } from 'next/navigation';

function RedirectSettings({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');
  !isMobile && push('/settings/account');

  return <>{children}</>;
}

export default RedirectSettings;
