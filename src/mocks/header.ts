import { FaCircleInfo, FaHouse, FaRegCircleUser } from 'react-icons/fa6';
import { BsSuitcaseLgFill } from 'react-icons/bs';

export const navLinks = [
  { href: '/', text: 'Anasayfa', icon: FaHouse },
  { href: '/tours', text: 'Turlar', icon: BsSuitcaseLgFill },
  {
    href: [
      '/iletisim',
      '/hakkimizda',
      '/hizmetlerimiz',
      '/gizlilik-politikasi',
      '/bilgi-guvenligi-politikasi',
      '/kullanim-sozlesmesi',
    ],
    text: 'İletişim',
    icon: FaCircleInfo,
  },
];
