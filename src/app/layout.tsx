"use client"
import * as React from 'react';
import Header from '@/components/general/Header';
import Footer from '@/components/general/Footer';
import ClickToGoUp from '@/components/general/ClickForGoUp';
import WhatsappButton from '@/components/general/WhatsappButton';
import PhoneButton from '@/components/general/PhoneButton';

import { Rubik } from 'next/font/google';
import './globals.css';

const rubik = Rubik({ subsets: ['latin'] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="tr" className="scroll-smooth">
      <body
        className={`${rubik.className} relative flex flex-col min-h-screen `}
      >
        <Header />
        <main className="flex flex-col flex-1">{children}</main>
        <Footer />
        <div className="fixed bottom-3 flex justify-between w-full px-3 z-[90]">
          <WhatsappButton />
          <PhoneButton />
        </div>
        <ClickToGoUp />
      </body>
    </html>
  );
};

export default RootLayout;
