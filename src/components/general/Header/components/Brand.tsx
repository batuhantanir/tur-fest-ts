import Image from 'next/image';
import Link from 'next/link';

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
