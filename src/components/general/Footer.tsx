import Link from "next/link";
import { FaInstagram, FaWhatsapp, FaPhoneFlip } from "react-icons/fa6";
import { Brand } from "./Header";
import FooterMail from "./FooterMail";

const data = [
  {
    title: "Kategoriler",
    links: [
      { label: "Marmara Turları", link: "#" },
      { label: "Anadolu Turları", link: "#" },
      { label: "Güney Doğu Anadolu Turları", link: "#" },
    ],
  },
  {
    title: "Bizi Tanıyın",
    links: [
      { label: "Hakkımızda", link: "/hakkimizda" },
      { label: "Hizmetlerimiz", link: "/hizmetlerimiz" },
      { label: "İletişim", link: "/iletisim" },
      { label: "Gizlilik Politikası", link: "/gizlilik-politikası" },
      {
        label: "Bilgi Güvenliği Politikası",
        link: "/bilgi-guvenligi-politikasi",
      },
      { label: "Kullanım Sözleşmesi", link: "/kullanim-sozlesmesi" },
    ],
  },
  {
    title: "Bize Ulaşın",
    links: [
      { label: "Müşteri Hizmetleri", link: "tel:+905059956402" },
      { label: "WhatsApp", link: "https://wa.me/+905059956402" },
      { label: "Instagram", link: "https://www.instagram.com/turfestcom" },
    ],
  },
];

function Footer() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Link key={index} href={link.link} className="hover:underline">
        {link.label}
      </Link>
    ));

    return (
      <div className="flex flex-col gap-1.5" key={group.title}>
        <div className="mb-2 text-lg font-bold">{group.title}</div>
        {links}
      </div>
    );
  });

  return (
    <footer className="border-t">
      <div className="md:container md:mx-auto">
        <div className="flex flex-col justify-between gap-5 px-5 py-10 border-b md:gap-0 md:flex-row">
          <div className="flex flex-col">
            <div className="w-[300px]">
              <Brand />
              <h1 className="sr-only">Turfest</h1>
              <p className="pl-1 text-base font-semibold">
                Kampanyalarımızdan haberdar olun!
              </p>
            </div>
            <FooterMail />
          </div>
          <div className="flex flex-row flex-wrap justify-between gap-5 pr-10 sm:gap-10 lg:gap-32 md:flex-nowrap md:justify-end ">
            {groups}
          </div>
        </div>
        <div className="flex justify-between gap-4 px-5 py-10">
          <p>© 2024 TurfestTravel.com. Tüm Hakları Saklıdır.</p>
          <div className="flex">
            <Link
              href="https://www.instagram.com/turfestcom"
              aria-label="Instagram Adresimize Ulaşın"
              className="flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer hover:bg-black/10"
            >
              <FaInstagram className="stroke-[1.5] " size={18} />
            </Link>
            <Link
              href="https://wa.me/+905059956402"
              aria-label="WhatsApp İletişim Hattımıza Bağlanın"
              className="flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer hover:bg-black/10"
            >
              <FaWhatsapp className="stroke-[1.5]" size={18} />
            </Link>
            <Link
              href="tel:+905059956402"
              aria-label="Telefon Numarası Aracılığıyla Müşteri Hizmetlerimize Bağlanın"
              className="flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer hover:bg-black/10"
            >
              <FaPhoneFlip size={16} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;