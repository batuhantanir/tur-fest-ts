import React from 'react';
import { twMerge } from 'tailwind-merge';
import { FaRegClock } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface IconBoxProps {
  icon?: IconType;
  text?: string;
  className?: string;
}

interface IconBoxWrapperProps {
  className?: string;
  children: React.ReactNode;
}

export const IconBox = ({
  icon: Icon = FaRegClock,
  text = '12',
  className,
  ...props
}: IconBoxProps) => {
  return (
    <div
      {...props}
      className={twMerge('flex flex-nowrap items-center gap-2', className)}
    >
      <Icon />
      <span className="whitespace-nowrap first-letter:uppercase">{text}</span>
    </div>
  );
};

function IconBoxWrapper({
  className,
  children,
  ...props
}: IconBoxWrapperProps) {
  return (
    <div
      {...props}
      className={twMerge(
        ' py-3 flex flex-nowrap items-center gap-x-5 md:gap-x-10',
        className
      )}
    >
      {children}
    </div>
  );
}

export default IconBoxWrapper;
