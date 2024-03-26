import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon } from 'lucide-react';

export const HandleFilter = ({
  categoryIsLoading,
  filters,
  months,
  setMonthParams,
}: {
  categoryIsLoading: boolean;
  filters: any;
  handleSearch: any;
  fetchProducts: any;
  months: any;
  setMonthParams: any;
}) => {
  const handleClick = () => {
    let sub_categories: Array<string> = [];
    let month: Array<string> = [];
    filters.map((item: any) => {
      item.sub_categories &&
        item.sub_categories.map((sub_item: any) => {
          if (sub_item.checked) {
            sub_categories.push(sub_item.id);
          }
        });
    });
    months.sub_categories.map((item: any) => {
      if (item.checked) {
        month.push(item.id);
      }
    });
    setMonthParams(month, sub_categories.join(','));
  };

  return (
    <div className="flex justify-center">
      {!categoryIsLoading ? (
        <button
          className="bg-cst-secondary/95 text-white font-medium py-2 w-[90%] rounded-lg my-5 hover:bg-cst-secondary/85 transition-colors duration-300 ease-in-out"
          type="button"
          onClick={handleClick}
        >
          Filtrele
        </button>
      ) : (
        <Skeleton className=" w-[90%] h-10 my-5" />
      )}
    </div>
  );
};

export const MonthFilter = ({
  months,
  setMonths,
  isMobile,
}: {
  months: any;
  setMonths: any;
  isMobile?: boolean;
}) => {
  const handleCheckboxChange = (categoryId: any) => {
    const updatedSubCategories = months.sub_categories.map(
      (subCategory: any) => {
        if (subCategory.id === categoryId) {
          return { ...subCategory, checked: !subCategory.checked };
        }
        return subCategory;
      }
    );

    setMonths((prev: any) => ({
      ...prev,
      sub_categories: updatedSubCategories,
    }));
  };

  return (
    <Disclosure
      as="div"
      className={cn('py-6 border-b border-gray-200 ', {
        'border-t px-4': isMobile,
      })}
    >
      {({ open }) => (
        <>
          <h3 className="flow-root -my-3">
            <Disclosure.Button
              className={cn(
                'flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500',
                { 'text-base': isMobile }
              )}
            >
              <span className="font-medium text-gray-900">Aylar</span>
              <span className="flex items-center ml-6">
                {open ? (
                  <MinusIcon className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <PlusIcon className="w-5 h-5" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className="pt-6">
            <>
              <div className="space-y-6" key={months.name}>
                {months.sub_categories.map((month: any, index: number) => (
                  <div key={month.value} className="flex items-center">
                    <div key={month.id}>
                      <input
                        id={`filter-month-${index}`}
                        name={`${month.id}`}
                        defaultValue={month.value}
                        checked={month.checked}
                        defaultChecked={month.checked}
                        type="checkbox"
                        onChange={() => handleCheckboxChange(month.id)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-month-${index}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {month.name}
                        {month.total_tours && `(${month.total_tours})`}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export const MinMaxPrice = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  isMobile,
}: {
  minPrice: number;
  maxPrice: number;
  setMinPrice: any;
  setMaxPrice: any;
  isMobile: boolean;
}) => {
  return (
    <div
      className={cn('py-6 border-b border-gray-200 ', {
        'border-t px-4': isMobile,
      })}
    >
      <>
        <h3 className="flow-root -my-3">
          <div
            className={cn(
              'flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500',
              { 'text-base': isMobile }
            )}
          >
            <span className="font-medium text-gray-900">Fiyat aralığı</span>
          </div>
        </h3>
        <div className="pt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <input
                  id="minPrice"
                  min={0}
                  max={maxPrice}
                  type="number"
                  value={minPrice}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^\d+$/.test(value)) {
                      setMinPrice(value);
                    }
                  }}
                  className="w-20 h-8 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor={`minPrice`}
                  className="ml-3 text-sm text-gray-600"
                >
                  MİN
                </label>
              </div>
              <div>
                <input
                  id="MaxPrice"
                  min={minPrice}
                  type="number"
                  value={maxPrice}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^\d+$/.test(value)) {
                      setMaxPrice(value);
                    }
                  }}
                  className="w-20 h-8 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor={`MaxPrice`}
                  className="ml-3 text-sm text-gray-600"
                >
                  MAX
                </label>
              </div>
            </div>
            {Number(minPrice) >= Number(maxPrice) &&
            (!(Number(maxPrice) == 0) || !(Number(minPrice) == 0)) ? (
              <div className="text-red-500 text-sm">
                Min fiyat max fiyattan büyük ve ya eşit olamaz.
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export const CategoryButton = ({
  category,
  handleSearch,
  searchParams,
}: {
  category: any;
  handleSearch: any;
  searchParams: any;
}) => {
  return (
    <li className="flex justify-between items-center">
      <button
        type="button"
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          handleSearch('category', category.id, params);
        }}
        className="block px-2 py-3 font-medium text-gray-900"
      >
        {category.name}
      </button>
      <button
        className={cn(
          `text-red-500 hidden mr-5 text-xl border border-red-500 hover:text-white hover:bg-red-500 active:scale-95 transition-all duration-150 w-8 h-8 rounded-full `,
          {
            block: category.id == searchParams.get('category'),
          }
        )}
        type="button"
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          handleSearch('category', 0, params);
        }}
      >
        x
      </button>
    </li>
  );
};

export const ChildCategory = ({
  section,
  setFilters,
  filters,
}: {
  section: any;
  setFilters: any;
  filters: any;
}) => {
  return (
    <div className="space-y-6">
      {section.sub_categories.map((option: any, optionIdx: any) => (
        <div key={option.value} className="flex items-center">
          <input
            id={`filter-${section.id}-${optionIdx}`}
            name={`${option.id}`}
            defaultValue={option.value}
            onChange={(e) => {
              const updatedOptions = section.sub_categories.map(
                (opt: any, idx: any) => {
                  if (idx === optionIdx) {
                    return {
                      ...opt,
                      checked: e.target.checked,
                    };
                  }
                  return opt;
                }
              );
              setFilters((prev: any) =>
                prev.map((prev: any) =>
                  prev.id === section.id
                    ? {
                        ...prev,
                        sub_categories: updatedOptions,
                      }
                    : prev
                )
              );
            }}
            checked={option.checked}
            type="checkbox"
            defaultChecked={option.checked}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label
            htmlFor={`filter-${section.id}-${optionIdx}`}
            className="ml-3 text-sm text-gray-600"
          >
            {option.name}
            {option.total_tours && `(${option.total_tours})`}
          </label>
        </div>
      ))}
    </div>
  );
};
