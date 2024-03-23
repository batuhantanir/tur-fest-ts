'use client';
import React from 'react';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { useRouter } from 'next/navigation';

function RedirectSettings() {
  const { push } = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');
  !isMobile && push('/settings/account');

  return <></>;
}

export default RedirectSettings;
