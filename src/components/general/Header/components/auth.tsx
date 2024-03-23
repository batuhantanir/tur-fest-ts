"server-only"
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
  const authSession: any = await getServerAuthSession();
  // console.log('asdasd', authSession);

  const className =
    'hover:bg-transparent hover:text-gray-200 text-xl font-bold ml-[16px] md:font-medium md:text-sm  md:hover:text-accent-foreground  md:px-5 md:py-1 md:text-center md:hover:bg-black/5';
  return (
    <>
      {!authSession?.user ? (
        <>
          <Link href="/login">
            <Button className={className} variant={'ghost'}>
              Giriş yap
            </Button>
          </Link>
          <Link href={'/register'}>
            <Button className={className} variant={'ghost'}>
              Üye ol
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Popover>
            <PopoverTrigger className="hidden transition-colors duration-150 md:flex items-center gap-2">
              <FaRegCircleUser size={22} stroke='1.5' />
              <span className="font-semibold text-lg first-letter:uppercase">
                {authSession.user.name}
              </span>
            </PopoverTrigger>
            <PopoverContent className="hidden md:block p-0 py-2 w-fit ">
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
          <LinkButton className='block md:hidden' href="/settings">Ayarlar</LinkButton>
          <div className="block md:hidden">{children}</div>
        </>
      )}
    </>
  );
}

export default Auth;
