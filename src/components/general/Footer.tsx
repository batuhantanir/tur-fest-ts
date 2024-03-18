import Link from 'next/link';
import { Brand } from './Header/components/Brand';
import FooterMail from './FooterMail';
import {
  footerCopyRight,
  footerData,
  footerDescription,
  footerIconData,
  footerTitle,
} from '@/mocks/footer';

function Footer() {
  const groups = footerData.map((group) => {
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
              <h1 className="sr-only">{footerTitle}</h1>
              <p className="pl-1 text-base font-semibold">
                {footerDescription}
              </p>
            </div>
            <FooterMail />
          </div>
          <div className="flex flex-row flex-wrap justify-between gap-5 pr-10 sm:gap-10 lg:gap-32 md:flex-nowrap md:justify-end ">
            {groups}
          </div>
        </div>
        <div className="flex justify-between gap-4 px-5 py-10">
          <p>{footerCopyRight}</p>
          <div className="flex">
            {footerIconData.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                aria-label={item['aria-label']}
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
