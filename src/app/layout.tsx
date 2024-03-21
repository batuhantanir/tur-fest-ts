import * as React from 'react';
import Header from '@/components/general/Header';
import Footer from '@/components/general/Footer';
import ClickToGoUp from '@/components/general/ClickForGoUp';
import WhatsappButton from '@/components/general/WhatsappButton';
import PhoneButton from '@/components/general/PhoneButton';

import { Rubik } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';

const rubik = Rubik({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TurFest',
  description: 'Generated by create next app',
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/icon.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/icon.png',
    },
  ],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="tr" className="scroll-smooth">
      <body
        className={`${rubik.className} relative flex flex-col min-h-screen `}
      >
        <Header />
        <main className="flex flex-col flex-1">{children}</main>
        {/* <Footer /> */}
        {/* <div className="fixed bottom-3 flex justify-between w-full px-3 z-[90]">
          <WhatsappButton />
          <PhoneButton />
        </div>
        <ClickToGoUp /> */}
      </body>
    </html>
  );
};

export default RootLayout;
