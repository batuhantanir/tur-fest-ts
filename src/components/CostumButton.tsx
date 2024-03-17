import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  href: string;
}
function CostumButton({
  children,
  className,
  href = '/',
  ...props
}: ButtonProps) {
  return (
    <Link
      {...props}
      href={href}
      className={cn(
        'border whitespace-nowrap border-cst-primary rounded-sm px-3 py-2 text-cst-primary hover:bg-cst-primary hover:text-white transition-all duration-200 ease-in-out active:scale-95',
        className
      )}
    >
      {children}
    </Link>
  );
}

export default React.memo(CostumButton);
