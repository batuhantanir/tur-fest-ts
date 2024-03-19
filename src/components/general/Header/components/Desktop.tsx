import React from 'react';
import Image from 'next/image';
import LinkButton from './LinkButton';
import Link from 'next/link';
import LoginAndRegister from './LoginAndRegister';
import { FaPhone, FaRegCircleUser } from 'react-icons/fa6';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { navLinks } from '@/mocks/header';
import { cn } from '@/lib/utils';
import { twMerge } from 'tailwind-merge';

interface DesktopProps {
  scrollY: number;
  scrollPoint: number;
  pathname: string;
  isMobile: boolean;
  setOpenNavbar: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

function Desktop({
  scrollY,
  scrollPoint,
  pathname,
  isMobile,
  setOpenNavbar,
  isLoading,
  logout,
  isAuthenticated,
}: DesktopProps) {
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
          <div className="items-center hidden gap-6 md:flex ">
            <LinkButton href="tel:+905059956402" icon={FaPhone}>
              0505 995 64 02
            </LinkButton>
            {!isLoading &&
              (!isAuthenticated ? (
                <LoginAndRegister setOpenNavbar={setOpenNavbar} />
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
                'relative  hover:text-black after:absolute hover:after:w-full after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-black after:transition-all after:duration-300 ',
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
