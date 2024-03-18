'use client';
import React from 'react';
import { LinkButton } from '@/components/general/Header';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { sercivesContainerData } from '@/mocks/servicesMocks';
import withAuth from '../withAuth';

interface ServicesContainerProps {
  children: React.ReactNode;
}

const ServicesContainer = ({ children }: ServicesContainerProps) => {
  const pathName = usePathname();

  return (
    <div className="md:container md:mx-auto pt-8 pb-12">
      <div className="md:flex md:container md:mx-auto w-full">
        <div className="w-1/5 hidden md:block">
          {sercivesContainerData.map((item, index) => (
            <LinkButton
              key={index}
              href={item.href}
              className={cn(
                `rounded-md px-4 py-3 text-left hover:bg-gray-200 `,
                {
                  'bg-gray-100': pathName === item.href,
                }
              )}
            >
              {item.title}
            </LinkButton>
          ))}
        </div>
        <div className="px-5 md:px-0 md:w-4/5 md:ml-6 flex-1 ">{children}</div>
      </div>
    </div>
  );
};

export default withAuth(ServicesContainer, 'optional');
