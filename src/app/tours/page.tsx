'use client';
import React, {
  useState,
  useEffect,
  Fragment,
  useCallback,
  SetStateAction,
} from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
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

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Skeleton } from '@/components/ui/skeleton';
import service from '@/lib/axios';
import { cn } from '@/lib/utils';
import Paginations from './components/Paginations';
import MobileFilter from './components/MobileFilter';
import {
  CategoryButton,
  ChildCategory,
  HandleFilter,
  MinMaxPrice,
  MonthFilter,
} from './components/utils';

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

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

function Tours() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOptionsName, setSortOptionsName] = useState('En Popüler');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [months, setMonths] = useState({
    name: 'Aylar',
    sub_categories: [
      {
        id: 1,
        name: 'Ocak',
        checked: false,
      },
      {
        id: 2,
        name: 'Şubat',
        checked: false,
      },
      {
        id: 3,
        name: 'Mart',
        checked: false,
      },
      {
        id: 4,
        name: 'Nisan',
        checked: false,
      },
      {
        id: 5,
        name: 'Mayıs',
        checked: false,
      },
      {
        id: 6,
        name: 'Haziran',
        checked: false,
      },
      {
        id: 7,
        name: 'Temmuz',
        checked: false,
      },
      {
        id: 8,
        name: 'Ağustos',
        checked: false,
      },
      {
        id: 9,
        name: 'Eylül',
        checked: false,
      },
      {
        id: 10,
        name: 'Ekim',
        checked: false,
      },
      {
        id: 11,
        name: 'Kasım',
        checked: false,
      },
      {
        id: 12,
        name: 'ARALIK',
        checked: false,
      },
    ],
  });
  const [categoryIsLoading, setCategoryIsLoading] = useState(true);
  const [totalProductsCount, setTotalProductsCount] = useState<Number | null>(
    null
  );
  const [filters, setFilters] = useState<any>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
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
  const { replace, refresh } = useRouter();

  const handleSearch = (query: any, term: any, params: any) => {
    if (term) {
      params.set(query, term);
    } else {
      params.delete(query);
    }
    params.delete('offset');
    params.delete('limit');

    replace(`${pathname}?${params}`);
  };

  const setMonthParams = (month: any, sub_categories: any) => {
    const params = new URLSearchParams(searchParams);

    if (month.length > 0) {
      handleSearch('month', month.join(','), params);
      handleSearch('sub_category', 0, params);
      if (sub_categories.length > 0)
        handleSearch('sub_category', sub_categories, params);
    } else {
      handleSearch('month', 0, params);
      if (sub_categories.length > 0)
        handleSearch('sub_category', sub_categories, params);
      else handleSearch('sub_category', 0, params);

      if (
        Number(minPrice) > 0 &&
        (Number(minPrice) < Number(maxPrice) || Number(maxPrice) == 0)
      ) {
        handleSearch('min_price', Number(minPrice) * 100, params);
      } else if (Number(minPrice) == 0) {
        handleSearch('min_price', 0, params);
      }

      if (
        Number(maxPrice) > 0 &&
        (Number(minPrice) < Number(maxPrice) || Number(minPrice) == 0)
      ) {
        handleSearch('max_price', Number(maxPrice) * 100, params);
      } else if (Number(maxPrice) == 0) {
        handleSearch('max_price', 0, params);
      }
    }
  };

  const fetchProducts = () => {
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
  };

  useEffect(() => {
    fetchProducts();
  }, [sortOptionsName, searchQuery]);

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

        setFilters([...categories]);
      })
      .catch(function (error) {
        alert(error.message);
      })
      .finally(() => {
        setCategoryIsLoading(false);
      });
    setMinPrice(Number(searchParams.get('min_price')) / 100);
    setMaxPrice(Number(searchParams.get('max_price')) / 100);
    setMonths((prev: any) => ({
      ...prev,
      sub_categories: prev.sub_categories.map((item: any) => ({
        ...item,
        checked: searchParams.get('month')?.includes(item.id),
      })),
    }));
  }, []);

  useEffect(() => {
    filters.map((item: any) => {
      item.sub_categories.map((sub_item: any) => {
        if (
          searchParams.get('sub_category') &&
          searchParams.get('sub_category')?.includes(sub_item.id)
        ) {
          sub_item.checked = true;
        }
      });
    });
  }, [products]);

  const sortOptionChange = ({ option }: { option: any }) => {
    sortOptions.map((item: any) => {
      if (item.name === option.name) {
        const params = new URLSearchParams(searchParams);
        item.current = true;
        handleSearch('order_by', item.key, params);
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
        <MobileFilter
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          filters={filters}
          setFilters={setFilters}
          handleSearch={handleSearch}
          fetchProducts={fetchProducts}
          categoryIsLoading={categoryIsLoading}
          searchParams={searchParams}
          months={months}
          setMonths={setMonths}
          setMonthParams={setMonthParams}
        />

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
              <form className="hidden lg:block overflow-y-auto max-h-screen">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="pb-6 space-y-4 text-sm font-medium text-gray-900 border-b border-gray-200"
                >
                  {categoryIsLoading && (
                    <>
                      <Skeleton className="w-[90px] h-[20px] bg-gray-200 border-b py-2" />
                      <Skeleton className="w-[90px] h-[20px] bg-gray-200 border-b py-2" />
                      <Skeleton className="w-[90px] h-[20px] bg-gray-200 border-b py-2" />
                    </>
                  )}

                  {filters.map((category: any, index: number) => (
                    <CategoryButton
                      searchParams={searchParams}
                      handleSearch={handleSearch}
                      key={index}
                      category={category}
                    />
                  ))}
                </ul>
                {categoryIsLoading && (
                  <div>
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div
                        className="flex justify-between border-b py-6"
                        key={i}
                      >
                        <Skeleton className="w-[120px] h-[20px] bg-gray-200" />
                        <Skeleton className="w-[20px] h-[20px] bg-gray-200" />
                      </div>
                    ))}
                  </div>
                )}
                {filters.map((section: any, sectionidx: number) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="py-6 border-b border-gray-200"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="flow-root -my-3">
                          <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500">
                            <span className="font-medium text-gray-900 first-letter:uppercase">
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
                          <ChildCategory
                            filters={filters}
                            setFilters={setFilters}
                            section={section}
                          />
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                {categoryIsLoading ? (
                  <>
                    <div>
                      {Array.from({ length: 2 }).map((_, i) => (
                        <div
                          className="flex justify-between border-b py-6"
                          key={i}
                        >
                          <Skeleton className="w-[120px] h-[20px] bg-gray-200" />
                          <Skeleton className="w-[20px] h-[20px] bg-gray-200" />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <MonthFilter
                      isMobile={false}
                      months={months}
                      setMonths={setMonths}
                    />
                    <MinMaxPrice
                      setMinPrice={setMinPrice}
                      setMaxPrice={setMaxPrice}
                      minPrice={minPrice}
                      maxPrice={maxPrice}
                      isMobile={false}
                    />
                  </>
                )}

                <HandleFilter
                  filters={filters}
                  handleSearch={handleSearch}
                  fetchProducts={fetchProducts}
                  categoryIsLoading={categoryIsLoading}
                  months={months}
                  setMonthParams={setMonthParams}
                />
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
            <Paginations
              isLoading={isLoading}
              products={products}
              offset={offset}
              limit={limit}
              searchQuery={searchQuery}
              totalProductsCount={totalProductsCount}
              isMobile={isMobile}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default Tours;
