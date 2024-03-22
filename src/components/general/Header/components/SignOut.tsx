'use client';
import { signOut } from 'next-auth/react';
import LinkButton from './LinkButton';

function SignOut() {
  return (
    <LinkButton
      href="/"
      className="-ml-[3px] md:-ml-0 md:px-5 md:py-1 md:text-center md:hover:bg-black/5"
      onClick={async () => {
        await signOut();
      }}
    >
      Çıkış yap
    </LinkButton>
  );
}

export default SignOut;
