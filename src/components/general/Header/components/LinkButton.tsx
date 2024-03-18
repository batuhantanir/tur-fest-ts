import Link from 'next/link';

interface LinkButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ElementType;
  href?: string;
  className?: string;
}

const LinkButton = ({
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

export default LinkButton;
