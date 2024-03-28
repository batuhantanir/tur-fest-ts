'server-only';
import React from 'react';
import SettingsContainer from '@/components/settings/SettingsContainer';
import TurnBack from '../TurnBack';

function Reservations() {
  return (
    <SettingsContainer pathname="/settings/reservations">
      <div className="md:px-6 flex h-[400px] flex-col gap-5 py-5">
        <h1 className="border-b py-3 pl-1 border-[#E4E4E7]">Rezervasyonlar</h1>
        <p>Kayıtlı rezervasyonunuz bulunmamaktadır.</p>
      </div>
      <TurnBack />
    </SettingsContainer>
  );
}

export default Reservations;
