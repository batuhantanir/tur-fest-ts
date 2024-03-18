'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { twMerge } from 'tailwind-merge';
import { FaChevronUp } from 'react-icons/fa6';
import { LuLocate, LuCalendar } from 'react-icons/lu';
import { useDebounce } from '@uidotdev/usehooks';
import axios from 'axios';
import Image from 'next/image';

const items = [
  {
    id: 'mart',
    label: 'Mart',
  },
  {
    id: 'nisan',
    label: 'Nisan',
  },
  {
    id: 'mayis',
    label: 'Mayıs',
  },
  {
    id: 'haziran',
    label: 'Haziran',
  },
  {
    id: 'temmuz',
    label: 'Temmuz',
  },
  {
    id: 'agustos',
    label: 'Ağustos',
  },
  {
    id: 'eylul',
    label: 'Eylül',
  },
  {
    id: 'ekim',
    label: 'Ekim',
  },
  {
    id: 'kasim',
    label: 'Kasım',
  },
  {
    id: 'aralik',
    label: 'Aralık',
  },
  {
    id: 'tum-donem',
    label: 'Tüm Dönem',
  },
];

export default function Component() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleChange = (e: ChangeEvent) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setSearchTerm(formData.get('search'));
    e.target.reset();
    e.target.focus();
  };

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  console.log(debouncedSearchTerm);
  useEffect(() => {
    if (debouncedSearchTerm) {
      axios
        .get(`${baseUrl}/search/cities?search=${debouncedSearchTerm}`)
        .then(function (response) {
          if (response.status === 200) {
            const data = response.data.data.cities;
            setResults(data.map((item) => item.city));
            setError(null);
          }
        })
        .catch(function (error) {
          setError(error.response.data.message);
        })
        .finally(() => {});
    }
  }, [debouncedSearchTerm, baseUrl]);

  return (
    <div className="flex justify-center relative w-full h-fit mt-[90px] md:mt-0 md:h-[800px]">
      <div className="hidden md:block relative w-full h-full">
        <Image
          className="object-cover brightness-75"
          src="/tourheader.jpg"
          alt="tour foto"
          fill
        />
      </div>
      <form
        onSubmit={handleSubmit}
        key="1"
        className="bg-white h-fit md:absolute sm:top-1/3 lg:-translate-x-1/2 xl:-translate-x-2/3  p-4 rounded-lg shadow-md w-full md:max-w-[500px]"
      >
        <div className="mb-6 border-b pb-2">
          <div className="flex items-center mb-1">
            <LuLocate className="text-cst-primary mr-2" size={24} />
            <h2 className="text-lg font-semibold">Nereye Gideceksiniz?</h2>
          </div>
          <div className="relative group">
            <input
              name="search"
              onChange={handleChange}
              id="search"
              className="mt-2 p-2 outline-none border-none rounded-md w-full"
              placeholder="Şehir ismi giriniz.."
              type="text"
              autoComplete="off"
            />
            <div
              className={`bg-white ${
                searchTerm && 'border'
              } rounded-lg border-cst-primary group-focus-within:flex max-h-[300px] overflow-auto w-full text-cst-primary absolute hidden flex-col top-10`}
            >
              {!error && searchTerm != '' && <h1>Şehirler</h1>}
              {error
                ? error
                : results.map((item, index) => (
                    <span key={index} className="text-cst-primary py-2 pl-4">
                      {item}
                    </span>
                  ))}
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div
            role="button"
            className="flex items-center justify-between mb-1 cursor-pointer w-full"
            onClick={() => setOpen(!open)}
          >
            <div className="flex flex-col">
              <div className="flex items-center">
                <LuCalendar className="text-cst-primary mr-2" size={24} />
                <h2 className="text-lg font-semibold">
                  Ne Zaman Gitmek İstersiniz?
                </h2>
              </div>
              <span
                className={`ml-[32px] ${
                  open ? 'text-black' : ' text-gray-500'
                } transition-colors duration-200`}
              >
                Tarih Seçiniz
              </span>
            </div>
            <FaChevronUp
              className={`text-gray-600 ${
                open && 'rotate-180'
              } transition-all duration-200`}
              size={16}
            />
          </div>
          <div
            className={twMerge(
              `hidden h-0  ${
                open && 'block  h-full mt-2'
              } transition-all duration-200 `
            )}
          >
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Button className="bg-gray-200 text-gray-700">
                2024-Seçili Dönem(0)
              </Button>
              <Button className="bg-gray-200 text-gray-700">
                2025-Seçili Dönem(0)
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {items.map((item, index) => (
                <div className="flex gap-2 flex-nowrap" key={index}>
                  <Checkbox id={item.id} />
                  <label className="text-sm font-medium" htmlFor={item.id}>
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button className="w-full bg-cst-primary hover:bg-cst-primary/90 text-white py-3">
          Ara
        </Button>
      </form>
    </div>
  );
}
