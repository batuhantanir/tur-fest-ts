"server-only"
import React from 'react';
import SettingsContainer from '@/components/settings/SettingsContainer';
import RedirectSettings from './RedirectSettings';

function Page() {
  return (
      <SettingsContainer pathname='/settings' >
        <RedirectSettings/>
      </SettingsContainer>
    
  );
}

export default Page;
