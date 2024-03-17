import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeStamp(begin: string, end: string) {
  const rtf2 = new Intl.RelativeTimeFormat('tr', { numeric: 'auto' });
}
