'use client';
import React, { useEffect } from 'react';
import SettingsContainer from '@/components/settings/SettingsContainer';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { useRouter } from 'next/navigation';

function Page() {
  const { push } = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (!isMobile) {
      push('/settings/account');
    }
  }, [isMobile, push]);

  return <SettingsContainer />;
}

export default Page;
