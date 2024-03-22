'server-only';
import Link from 'next/link';
import { BsKeyFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import { IoLogOutOutline, IoTicketSharp } from 'react-icons/io5';
import { getServerAuthSession } from '@/server/auth';

const data = [
  {
    icon: FaUser,
    content: 'Hesap Bilgilerim',
    href: 'account',
  },
  {
    icon: IoTicketSharp,
    content: 'Rezervasyonlarım',
    href: 'reservations',
  },
  {
    icon: BsKeyFill,
    content: 'Şifre Bilgilerim',
    href: 'resetpassword',
  },
];

interface Props {
  children?: React.ReactNode;
  username?: string;
}

async function SettingsContainer({ children, username }: Props) {
  return (
    <div className="px-5 pb-20">
      <div className="flex flex-col md:flex-row md:flex py-10 gap-[150px] md:gap-5 md:container md:mx-auto">
        <div className="hidden md:block md:w-1/3 h-[300px] border rounded-xl border-[#CFD4DA]">
          <div className="flex w-full h-[28%] border-[#CFD4DA]">
            <div className="flex items-center justify-center px-6">
              <h2 className="text-sm md:text-base flex gap-1">
                <span>Hoşgeldiniz</span>
                {username && (
                  <span className="first-letter:uppercase">{username}</span>
                )}
              </h2>
            </div>
          </div>
          {data.map((item, index) => (
            <div
              key={index}
              className="flex w-full h-[24%] border-t border-[#CFD4DA]"
            >
              <Link
                href={`settings/${item.href}`}
                className="flex items-center justify-between w-full px-6"
              >
                <div className="flex items-center justify-center gap-3">
                  <item.icon size={18} className="text-[#3F536C]" />
                  <span className="text-[#3F536C] text-sm md:text-base">
                    {item.content}
                  </span>
                </div>
                <div>
                  <IoIosArrowForward size={18} className="text-[#3F536C]" />
                </div>
              </Link>
            </div>
          ))}
          <div className="flex mt-5 h-[24%] rounded-xl w-full border border-[#CFD4DA]">
            <div className="flex items-center justify-between w-full px-6">
              <div className="flex items-center justify-center gap-3">
                <IoLogOutOutline size={18} className="text-[#3F536C]" />
                <button className="text-[#3F536C] text-sm md:text-base">
                  Çıkış Yap
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block md:w-2/3 md:border rounded-xl border-[#CFD4DA]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default SettingsContainer;
