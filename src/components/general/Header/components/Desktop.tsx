import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { navLinks } from '@/mocks/header';
import { PhoneIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';
import LinkButton from './LinkButton';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { useAuthStore } from '@/store/useAuthStore';

function Desktop({ pathname, setIsLoading, setOpenNavbar, isLoading }: any) {
  const [scrollY, setScrollY] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { logout, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    setIsLoading(false);
    setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollPoint = isMobile ? 55 : 55;
  return (
    <header
      className={cn(
        'w-full transition-all duration-200 fixed top-0  z-[40] text-white bg-transparent',
        {
          ' shadow-black drop-shadow-md bg-white text-black':
            scrollY > scrollPoint,
          'bg-white text-black': pathname != '/',
        }
      )}
    >
      <div className={`bg-transparent w-full md:container md:mx-auto `}>
        <div
          className={cn(
            ' flex justify-center md:justify-between items-center md:px-5 relative',
            {
              'border-b': scrollY > scrollPoint,
            }
          )}
        >
          <Link href="/">
            <Image
              src={`${
                pathname != '/' || isMobile || scrollY > scrollPoint
                  ? '/logoNormal.png'
                  : '/logoBeyaz.png'
              }`}
              width={118}
              height={45}
              alt="Turfest Logo"
              className="transition-all duration-200"
            />
          </Link>
          <div className="items-center hidden gap-3 md:flex ">
            <Link href={'tel:+9005059956402'}>
              <Button variant={'ghost'}>
                <PhoneIcon className="w-4 h-4 mr-2" />
                0505 995 64 02
              </Button>
            </Link>
            {!isLoading &&
              (!isAuthenticated ? (
                <>
                  <Link href={'/login'}>
                    <Button
                      onClick={() => setOpenNavbar(false)}
                      variant={'ghost'}
                    >
                      Giriş yap
                    </Button>
                  </Link>
                  <Link href={'/register'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setOpenNavbar(false)}
                    >
                      Üye ol
                    </Button>
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
                      <LinkButton
                        className="px-5 py-1 text-center hover:bg-black/5"
                        onClick={() => {
                          logout();
                        }}
                      >
                        Çıkış Yap
                      </LinkButton>
                    </PopoverContent>
                  </Popover>
                </>
              ))}
          </div>
        </div>
        <nav className="hidden md:flex flex-col md:flex-row gap-3 md:gap-6 py-2 mb-1 px-5 text-gray-500">
          {navLinks.map((link, index) => (
            <a
              key={index}
              className={twMerge(
                'relative hover:text-black after:absolute hover:after:w-full after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-black after:transition-all after:duration-300 ',
                `${
                  (typeof link.href == 'string'
                    ? pathname === link.href
                    : link.href.find((href) => href == pathname)) &&
                  'after:w-full text-black'
                }`,
                pathname == '/' &&
                  (scrollY > scrollPoint
                    ? 'hover:text-black '
                    : 'text-white hover:text-white/80 after:bg-white ')
              )}
              href={typeof link.href == 'string' ? link.href : link.href[0]}
            >
              {link.text}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Desktop;
