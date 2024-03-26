import React, { Fragment } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { MinusIcon, PlusIcon } from 'lucide-react';
import {
  CategoryButton,
  ChildCategory,
  HandleFilter,
  MonthFilter,
} from './utils';

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  filters,
  setFilters,
  handleSearch,
  fetchProducts,
  categoryIsLoading,
  searchParams,
  months,
  setMonths,
  setMonthParams,
}: {
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: any;
  filters: any;
  setFilters: any;
  handleSearch: any;
  fetchProducts: any;
  categoryIsLoading: boolean;
  searchParams: any;
  months: any;
  setMonths: any;
  setMonthParams: any;
}) {
  return (
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
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
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
                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  {filters.map((category: any, index: number) => (
                    <CategoryButton
                      key={index}
                      category={category}
                      handleSearch={handleSearch}
                      searchParams={searchParams}
                    />
                  ))}
                </ul>

                {filters.map((section: any) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="px-4 py-6 border-t border-gray-200"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="flow-root -mx-2 -my-3">
                          <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white hover:text-gray-500">
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
                <MonthFilter
                  isMobile={true}
                  months={months}
                  setMonths={setMonths}
                />
                <HandleFilter
                  filters={filters}
                  handleSearch={handleSearch}
                  fetchProducts={fetchProducts}
                  categoryIsLoading={categoryIsLoading}
                  months={months}
                  setMonthParams={setMonthParams}
                />
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default MobileFilter;
