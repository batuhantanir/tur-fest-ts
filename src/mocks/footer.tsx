import { FaInstagram, FaWhatsapp, FaPhoneFlip } from 'react-icons/fa6';

export const footerTitle = 'Turfest';
export const footerDescription = 'Kampanyalarımızdan haberdar olun!';
export const footerCopyRight = '© 2024 TurfestTravel.com Tüm Hakları Saklıdır.';
export const footerData = [
  {
    title: 'Kategoriler',
    links: [
      { label: 'Marmara Turları', link: '/tours' },
      { label: 'Anadolu Turları', link: '/tours' },
      { label: 'Güney Doğu Anadolu Turları', link: '/tours' },
    ],
  },
  {
    title: 'Bizi Tanıyın',
    links: [
      { label: 'Hakkımızda', link: '/hakkimizda' },
      { label: 'Hizmetlerimiz', link: '/hizmetlerimiz' },
      { label: 'İletişim', link: '/iletisim' },
      { label: 'Gizlilik Politikası', link: '/gizlilik-politikasi' },
      {
        label: 'Bilgi Güvenliği Politikası',
        link: '/bilgi-guvenligi-politikasi',
      },
      { label: 'Kullanım Sözleşmesi', link: '/kullanim-sozlesmesi' },
    ],
  },
  {
    title: 'Bize Ulaşın',
    links: [
      { label: 'Müşteri Hizmetleri', link: 'tel:+905059956402' },
      { label: 'WhatsApp', link: 'https://wa.me/+905059956402' },
      { label: 'Instagram', link: 'https://www.instagram.com/turfestcom' },
    ],
  },
];

export const footerIconData = [
  {
    icon: <FaInstagram className="stroke-[1.5] " size={18} />,
    link: 'https://www.instagram.com/turfestcom',
    'aria-label': 'Instagram Adresimize Ulaşın',
  },
  {
    icon: <FaWhatsapp className="stroke-[1.5]" size={18} />,
    link: 'https://wa.me/+905059956402',
    'aria-label': 'WhatsApp İletişim Hattımıza Bağlanın',
  },
  {
    icon: <FaPhoneFlip size={16} />,
    link: 'tel:+905059956402',
    'aria-label':
      'Telefon Numarası Aracılığıyla Müşteri Hizmetlerimize Bağlanın',
  },
];
