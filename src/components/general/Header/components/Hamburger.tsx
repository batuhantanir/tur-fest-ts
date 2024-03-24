import { cn } from '@/lib/utils';
import './Hamburger.css';

interface HamburgerProps {
  openNavbar: boolean;
  setOpenNavbar: (value: boolean) => void;
  hamburgerRef: React.RefObject<HTMLDivElement>;
}

interface HamburgerItemProps {
  openNavbar: boolean;
}

const HamburgerItem = ({ openNavbar }: HamburgerItemProps) => {
  return (
    <span
      className={cn('bg-cst-primary', {
        'bg-white': openNavbar,
      })}
    ></span>
  );
};

function Hamburger({
  openNavbar,
  setOpenNavbar,
  hamburgerRef,
}: HamburgerProps) {
  return (
    <div
      ref={hamburgerRef}
      onClick={() => setOpenNavbar(!openNavbar)}
      id="nav-icon2"
      className={`block  md:hidden z-[10000] fixed top-1  left-0 ${
        openNavbar && 'open'
      }`}
    >
      <HamburgerItem openNavbar={openNavbar} />
      <HamburgerItem openNavbar={openNavbar} />
      <HamburgerItem openNavbar={openNavbar} />
      <HamburgerItem openNavbar={openNavbar} />
      <HamburgerItem openNavbar={openNavbar} />
      <HamburgerItem openNavbar={openNavbar} />
    </div>
  );
}

export default Hamburger;
