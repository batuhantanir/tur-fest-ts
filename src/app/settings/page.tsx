import React from 'react';
import SettingsContainer from '@/components/settings/SettingsContainer';
import RedirectSettings from './RedirectSettings';

function Page() {
  return (
    <RedirectSettings>
      <SettingsContainer pathname='/settings' />
    </RedirectSettings>
  );
}

export default Page;
