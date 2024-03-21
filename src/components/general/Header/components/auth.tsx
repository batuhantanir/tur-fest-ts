import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import LinkButton from './LinkButton';
import { FaRegCircleUser } from 'react-icons/fa6';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getServerAuthSession } from '@/server/auth';

interface AuthProps {
  children: React.ReactNode;
}

async function Auth({ children }: AuthProps) {
  const authSession = await getServerAuthSession();
    console.log(authSession);
  return (
    <>
      {!authSession?.user ? (
        <>
          <Link href={'/login'}>
            <Button variant={'ghost'}>Giriş yap</Button>
          </Link>
          <Link href={'/register'}>
            <Button variant={'ghost'}>Üye ol</Button>
          </Link>
        </>
      ) : (
        <>
          <Popover>
            <PopoverTrigger>
              <FaRegCircleUser size={22} />
              {/* <span>{userName}</span> */}
            </PopoverTrigger>
            <PopoverContent className="p-0 py-2 w-fit ">
              <LinkButton
                className="px-5 py-1 text-center hover:bg-black/5"
                href="/settings/account"
              >
                Ayarlar
              </LinkButton>
              <LinkButton
                className="px-5 py-1 text-center hover:bg-black/5"
                href="/settings/reservations"
              >
                Rezervasyonlarım
              </LinkButton>
              {children}
            </PopoverContent>
          </Popover>
        </>
      )}
    </>
  );
}

export default Auth;
