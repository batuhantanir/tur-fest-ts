'use client';
import { signOut } from 'next-auth/react';
import { IoLogOutOutline } from 'react-icons/io5';

function SettingsSignOut() {
  return (
    <div className="flex mt-5 h-[24%] rounded-xl w-full border border-[#CFD4DA]">
      <div className="flex items-center justify-between w-full px-6">
        <div className="flex items-center justify-center gap-3">
          <IoLogOutOutline size={18} className="text-[#3F536C]" />
          <button
            onClick={async () => {
              await signOut();
            }}
            className="text-[#3F536C] text-sm md:text-base"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsSignOut;
