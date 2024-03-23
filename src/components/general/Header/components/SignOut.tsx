'use client';
import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import LinkButton from './LinkButton';

function SignOut({ className }: { className?: string }) {
  return (
    <LinkButton
      href="/"
      className={cn(
        '-ml-[3px] md:-ml-0 md:px-5 md:py-1 md:text-center md:hover:bg-black/5',
        className
      )}
      onClick={async () => {
        await signOut();
      }}
    >
      Çıkış yap
    </LinkButton>
  );
}

export default SignOut;
