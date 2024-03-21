'use client';
import { signOut } from 'next-auth/react';

function SignOut() {
  return (
    <button
      className="px-5 py-1 text-center hover:bg-black/5"
      onClick={async () => {
        await signOut();
      }}
    >
      Çıkış Yap
    </button>
  );
}

export default SignOut;
