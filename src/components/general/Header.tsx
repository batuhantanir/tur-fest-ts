'use client';
import { useMediaQuery } from '@/lib/useMediaQuery';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { BsSuitcaseLgFill } from 'react-icons/bs';
import { FaPhone, FaRegUser, FaUnlock } from 'react-icons/fa';
import {
  FaCircleInfo,
  FaHouse,
  FaRegCircleUser,
  FaUser,
} from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAuthStore } from '@/store/useAuthStore';

import { cn } from '@/lib/utils';
import './Header.css';

interface LinkButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ElementType;
  href?: string;
  className?: string;
}

interface OnClickProps {
  onClick: MouseEventHandler;
  children: React.ReactNode;
  className?: string;
}

export const LinkButton = ({
  onClick,
  children,
  icon: Icon,
  href = '',
  className = '',
}: LinkButtonProps) => {
  return (
    <Link
      href={href}
      onClick={onClick && onClick}
      className={`flex gap-4 items-center ${className}`}
    >
      {Icon ? (
        <Icon className="h-[20px] w-[20px]" size={20} />
      ) : (
        <div className="h-[20px] w-[20px]"></div>
      )}
      <span>{children}</span>
    </Link>
  );
};

export const Brand = () => {
  return (
    <Link href="/">
      <Image
        src="/logoNormal.png"
        width={118}
        height={45}
        alt="Turfest Logo"
        className=""
      />
    </Link>
  );
};

function Header() {
  const [openNavbar, setOpenNavbar] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navbarRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const pathname = usePathname();
  const { logout, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(e.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(e.target as Node)
      ) {
        setOpenNavbar(false);
      }
    };
    openNavbar && isMobile
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [navbarRef, isMobile, openNavbar, hamburgerRef]);

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

  const navLinks = [
    { href: '/', text: 'Anasayfa', icon: FaHouse },
    { href: '/tours', text: 'Turlar', icon: BsSuitcaseLgFill },
    {
      href: [
        '/iletisim',
        '/hakkimizda',
        '/hizmetlerimiz',
        '/gizlilik-politikasi',
        '/bilgi-guvenligi-politikasi',
        '/kullanim-sozlesmesi',
      ],
      text: 'İletişim',
      icon: FaCircleInfo,
    },
  ];

  return (
    <>
      {pathname != '/' && (
        <div className={` h-[74.75px] md:h-[114.75px]`}></div>
      )}{' '}
      {/* Yer tutucu */}
      <header
        className={twMerge(
          `w-full   transition-all duration-200 fixed top-0  z-[40]  
            ${
              scrollY > scrollPoint
                ? ' shadow-black drop-shadow-md bg-white text-black'
                : 'text-white bg-transparent'
            } `,
          pathname != '/' && 'bg-white text-black'
        )}
      >
        <div className={`bg-transparent w-full md:container md:mx-auto `}>
          <div
            className={` flex justify-center md:justify-between items-center ${
              scrollY > scrollPoint && 'border-b'
            } md:px-5 relative`}
          >
            <Link href="/">
              <Image
                src={`${
                  pathname == '/' && !isMobile
                    ? scrollY > scrollPoint
                      ? '/logoNormal.png'
                      : '/logoBeyaz.png'
                    : '/logoNormal.png'
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
                  <>
                    <LinkButton icon={FaUnlock} href="/login">
                      Giriş Yap
                    </LinkButton>
                    <LinkButton icon={FaRegUser} href="/register">
                      Üye Ol
                    </LinkButton>
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
                          className="px-10 py-1 text-center hover:bg-black/5"
                          href="/settings/account"
                        >
                          Ayarlar
                        </LinkButton>
                        <LinkButton
                          className="px-10 py-1 text-center hover:bg-black/5"
                          href="/settings/reservations"
                        >
                          Rezervasyonlarım
                        </LinkButton>
                        <button
                          className="px-10 py-1 text-center hover:bg-black/5"
                          onClick={() => {
                            logout();
                          }}
                        >
                          Çıkış Yap
                        </button>
                      </PopoverContent>
                    </Popover>
                  </>
                ))}
            </div>
          </div>
          <nav
            className={twMerge(
              'hidden md:flex flex-col md:flex-row gap-3 md:gap-6 py-2 mb-1 px-5 text-gray-500'
            )}
          >
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
      {isMobile && (
        <>
          <div
            ref={hamburgerRef}
            onClick={() => setOpenNavbar(!openNavbar)}
            id="nav-icon2"
            className={`block  md:hidden z-[10000] fixed  left-0 ${
              openNavbar && 'open'
            }`}
          >
            {Array(6)
              .map((_, index) => (
                <span
                  key={index}
                  className={cn('bg-cst-primary', {
                    'bg-white': openNavbar,
                  })}
                ></span>
              ))}
          </div>
          <div
            ref={navbarRef}
            className={`text-white top-0 left-0  bg-cst-primary text-xl font-bold  brightness-90 transition-transform duration-300 md:duration-0 p-5 md:p-0 fixed md:relative h-full min-w-[280px] md:h-fit z-[110] md:z-0 ${
              openNavbar
                ? 'translate-x-0'
                : 'translate-x-[-120%] md:translate-x-0'
            }`}
          >
            <div className="w-full h-16"></div>
            <nav
              className={twMerge(
                'flex flex-col md:hidden md:flex-row gap-3 md:gap-6 py-2 px-5 '
              )}
            >
              {navLinks.map((link, index) => (
                <LinkButton
                  href={typeof link.href == 'string' ? link.href : link.href[0]}
                  onClick={() => setOpenNavbar(false)}
                  key={index}
                  icon={link.icon}
                >
                  {link.text}
                </LinkButton>
              ))}
            </nav>
            {!isLoading && (
              <div className="flex flex-col items-start gap-3 px-5 mb-5 md:hidden ">
                {isAuthenticated ? (
                  <>
                    <LinkButton
                      onClick={() => setOpenNavbar(false)}
                      icon={FaUser}
                      href="/login"
                    >
                      Giriş yap
                    </LinkButton>
                    <LinkButton
                      onClick={() => setOpenNavbar(false)}
                      href="/register"
                    >
                      Üye ol
                    </LinkButton>
                  </>
                ) : (
                  <>
                    <LinkButton
                      onClick={() => setOpenNavbar(false)}
                      href="/profile"
                    >
                      Profil
                    </LinkButton>
                    <button
                      onClick={() => {
                        setOpenNavbar(false);
                        logout();
                      }}
                    >
                      Çıkış Yap
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          <div
            className={` bg-black/50 transition-opacity duration-400 w-full top-0 left-0  h-full ${
              openNavbar
                ? 'z-[100] opacity-100 md:opacity-0 fixed '
                : 'relative opacity-0'
            }`}
          ></div>
        </>
      )}
    </>
  );
}

export default Header;
