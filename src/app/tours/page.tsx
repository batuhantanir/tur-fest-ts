'use client';
import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/20/solid';
import { FaArrowDown } from 'react-icons/fa6';
import { FaArrowUp } from 'react-icons/fa6';
import ProductCard from './components/ProductCard';
import ProductCardSkeleton from './components/ProductCardSkeleton';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { Skeleton } from '@/components/ui/skeleton';
// import { whichMonth } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import service from '@/lib/axios';

type SubCategory = {
  _id: string;
  name: string;
};

type Category = {
  _id: string;
  name: string;
  sub_categories: Array<SubCategory>;
};

const sortOptions = [
  { name: 'En Popüler', key: 'most_popular', href: '#', current: true },
  { name: 'En Yakın tarih', key: 'nearest', href: '#', current: false },
  { name: 'En Geç tarih', key: 'lastest', href: '#', current: false },
  {
    name: 'Fiyata Göre Artan',
    key: 'cheapest',
    href: '#',
    current: false,
    icon: FaArrowUp,
  },
  {
    name: 'Fiyata Göre Azalan',
    key: 'most_expensive',
    href: '#',
    current: false,
    icon: FaArrowDown,
  },
];

const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
];

// const filters = [
//   {
//     id: 'dönem',
//     name: 'Dönem',
//     options: [
//       { value: 'ilkbahar', label: 'İlkbahar', checked: false },
//       { value: 'yaz', label: 'Yaz', checked: true },
//       { value: 'sonbahar', label: 'Sonbahar', checked: false },
//       { value: 'kış', label: 'Kış', checked: false },
//     ],
//   },
//   {
//     id: 'category',
//     name: 'Category',
//     options: [
//       { value: 'new-arrivals', label: 'New Arrivals', checked: false },
//       { value: 'sale', label: 'Sale', checked: false },
//       { value: 'travel', label: 'Travel', checked: true },
//       { value: 'organization', label: 'Organization', checked: false },
//       { value: 'accessories', label: 'Accessories', checked: false },
//     ],
//   },
//   {
//     id: 'size',
//     name: 'Size',
//     options: [
//       { value: '2l', label: '2L', checked: false },
//       { value: '6l', label: '6L', checked: false },
//       { value: '12l', label: '12L', checked: false },
//       { value: '18l', label: '18L', checked: false },
//       { value: '20l', label: '20L', checked: false },
//       { value: '40l', label: '40L', checked: true },
//     ],
//   },
// ]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

function Tours() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOptionsName, setSortOptionsName] = useState('En Popüler');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryIsLoading, setCategoryIsLoading] = useState(true);
  const [totalProductsCount, setTotalProductsCount] = useState<Number | null>(
    null
  );
  const [filters, setFilters] = useState([]);
  const searchParams = useSearchParams();
  const limit = Number(searchParams.get('limit'))
    ? Number(searchParams.get('limit'))
    : 5;
  const offset = Number(searchParams.get('offset'))
    ? Number(searchParams.get('offset'))
    : 0;
  const isMobile = useMediaQuery('(max-width: 640px)');
  const searchQuery = searchParams.toString();
  const updateSearchQuery = searchQuery
    .split('&')
    .filter((item) => !item.includes('limit') && !item.includes('offset'))
    .join('&');

  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useCallback((query, term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(query, term.toString());
    } else {
      params.delete(query);
    }
    params.delete('offset');
    params.delete('limit');
    replace(`${pathname}?${params}`);
  }, []);

  useEffect(() => {
    service
      .get(
        `/tours/list?limit=${limit}&offset=${offset}${
          updateSearchQuery && `&${updateSearchQuery}`
        }`
      )
      .then(function (res) {
        setIsLoading(true);
        setProducts(res.data.data.tours);
        setTotalProductsCount(res.data.data.total);
      })
      .catch(function (error) {
        alert(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [sortOptionsName]);

  useEffect(() => {
    service
      .get(`/categories`)
      .then(function (response) {
        const categories = response.data.data.map((category: Category) => {
          return {
            id: category._id,
            name: category.name,
            sub_categories: category.sub_categories.map((sub_category) => {
              return {
                id: sub_category._id,
                name: sub_category.name,
                checked: false,
              };
            }),
          };
        });

        setFilters((prev) => {
          return [...prev, ...categories];
        });
      })
      .catch(function (error) {
        alert(error.message);
      })
      .finally(() => {
        setCategoryIsLoading(false);
      });
  }, []);

  useEffect(() => {
    filters.map((item) => {
      console.log(item);
    });
  }, [filters]);

  const sortOptionChange = ({ option }) => {
    sortOptions.map((item) => {
      if (item.name === option.name) {
        item.current = true;
        handleSearch('order_by', item.key);
        setSortOptionsName(item.name);
      } else {
        item.current = false;
      }
    });
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative flex flex-col w-full h-full max-w-xs py-4 pb-12 ml-auto overflow-y-auto bg-white shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    >
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="px-4 py-6 border-t border-gray-200"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="flow-root -mx-2 -my-3">
                              <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="flex items-center ml-6">
                                  {open ? (
                                    <MinusIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.sub_categories.map(
                                  (option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter - mobile - ${section.id} - ${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter - mobile - ${section.id} - ${optionIdx}`}
                                        className="flex-1 min-w-0 ml-3 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  )
                                )}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="w-full container max-w-7xl">
          <div className="flex items-baseline justify-between py-6 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Turlar
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                    Sırala
                    <ChevronDownIcon
                      className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-2xl w-44 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              onClick={() => sortOptionChange({ option })}
                              className={classNames(
                                option.current
                                  ? 'font-medium text-gray-900'
                                  : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                ' px-4 py-2 text-sm flex items-center w-full justify-between hover:bg-gray-100'
                              )}
                            >
                              <span className="whitespace-nowrap">
                                {option.name}
                              </span>
                              <span>
                                {option.icon && (
                                  <option.icon className="size-3" />
                                )}
                              </span>
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <button
                type="button"
                className="p-2 ml-4 -m-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 ">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="pb-6 space-y-4 text-sm font-medium text-gray-900 border-b border-gray-200"
                >
                  {filters.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="py-6 border-b border-gray-200"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="flow-root -my-3">
                          <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="flex items-center ml-6">
                              {open ? (
                                <MinusIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.sub_categories.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter - ${section.id} - ${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter - ${section.id} - ${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.name}
                                  {option.total_tours &&
                                    `(${option.total_tours})`}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              {isLoading ? (
                <ProductCardSkeleton />
              ) : !products.length || products.length == 0 ? (
                <div className="text-center">Herhangi bir tur bulunamadı.</div>
              ) : (
                <ProductCard products={products} />
              )}
            </div>
            {products.length != 0 &&
              (isLoading ? (
                <Pagination className={'py-10'}>
                  <PaginationContent className={`space - x - 4`}>
                    <PaginationItem>
                      <Skeleton className="w-[70px] h-[30px] bg-gray-200" />
                    </PaginationItem>
                    <PaginationItem>
                      <Skeleton className="w-[50px] h-[30px] bg-gray-200" />
                    </PaginationItem>
                    <PaginationItem>
                      <Skeleton className="w-[70px] h-[30px] bg-gray-200" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              ) : (
                <Pagination className={'py-10'}>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href={`${
                          offset > 0
                            ? `/tours?limit=${limit}&offset=${
                                offset - limit
                              }&${searchQuery
                                .split('&')
                                .filter(
                                  (item) =>
                                    !item.includes('limit') &&
                                    !item.includes('offset')
                                )
                                .join('&')}`
                            : '#'
                        }`}
                        className={`${
                          offset <= 0 &&
                          'pointer-events-none text-black/50 hover:text-black/50'
                        }`}
                      />
                    </PaginationItem>
                    <PaginationItem>
                      {offset - limit >= 0 && !isMobile && (
                        <PaginationLink
                          href={`/tours?limit${limit}&offset=${
                            offset - limit
                          }&${searchQuery
                            .split('&')
                            .filter(
                              (item) =>
                                !item.includes('limit') &&
                                !item.includes('offset')
                            )
                            .join('&')}`}
                        >
                          {offset / limit}
                        </PaginationLink>
                      )}
                      <PaginationLink href="#">
                        {offset / limit + 1}
                      </PaginationLink>
                      {offset + limit < totalProductsCount && !isMobile && (
                        <PaginationLink
                          href={`/tours?limit${limit}&&offset=${
                            offset + limit
                          }&${searchQuery
                            .split('&')
                            .filter(
                              (item) =>
                                !item.includes('limit') &&
                                !item.includes('offset')
                            )
                            .join('&')}`}
                        >
                          {offset / limit + 2}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                    {!isMobile && (
                      <PaginationItem>
                        {offset + 2 * limit < totalProductsCount && (
                          <PaginationEllipsis />
                        )}
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationNext
                        href={
                          offset + limit < totalProductsCount
                            ? `/tours?limit=${limit}&offset=${
                                offset + limit
                              }&${searchQuery
                                .split('&')
                                .filter(
                                  (item) =>
                                    !item.includes('limit') &&
                                    !item.includes('offset')
                                )
                                .join('&')}`
                            : '#'
                        }
                        className={`${
                          !(offset + limit < totalProductsCount) &&
                          'pointer-events-none text-black/50 hover:text-black/50'
                        }`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              ))}
          </section>
        </main>
      </div>
    </div>
  );
}

export default Tours;
