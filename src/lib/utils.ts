import { type ClassValue, clsx } from 'clsx';
import { cache } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timeStamp = cache((beginDate = '', endDate = '') => {
  const end_date: Date = new Date(endDate);
  const begin_date: Date = new Date(beginDate);
  const seconds = (end_date.getTime() - begin_date.getTime()) / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  return days >= 1
    ? `${Math.floor(days)} gün`
    : hours >= 1
    ? `${Math.floor(hours)} saat`
    : minutes >= 1
    ? `${Math.floor(minutes)} dakika`
    : seconds >= 1
    ? `${Math.floor(seconds)} saniye`
    : 'kısa süre';
});
