import { Skeleton } from '@/components/ui/skeleton';
import IconBoxWrapper from '@/components/IconBoxs';

const ProductCardSkeleton = () => {
  return (
    <div className="space-y-3 lg:col-span-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center w-full rounded-lg shadow-md md:items-stretch md:flex-row h-fit bg-gray-50 group"
        >
          <Skeleton className="relative w-full h-56 bg-gray-200 md:w-fit min-w-60 md:h-72" />
          <div className="flex flex-col justify-between w-full sm:flex-row">
            <div className="flex flex-col justify-between flex-1 m-5 sm:border-r">
              <div className="space-y-4">
                <div className="text-lg font-semibold ">
                  <Skeleton className="w-[200px] h-[24px] bg-gray-200" />
                </div>
                <div className="space-y-1.5">
                  <Skeleton className="w-[90%] h-[18px] bg-gray-200" />
                  <Skeleton className="w-[90%] h-[18px] bg-gray-200" />
                  <Skeleton className="w-[90%] h-[18px] bg-gray-200" />
                  <Skeleton className="w-[70%] h-[18px] bg-gray-200" />
                </div>
              </div>
              <IconBoxWrapper className={`flex-wrap gap-y-5`}>
                <Skeleton className="w-20 h-5 bg-gray-200" />
                <Skeleton className="w-20 h-5 bg-gray-200" />
                <Skeleton className="w-20 h-5 bg-gray-200" />
              </IconBoxWrapper>
            </div>
            <div className="flex items-center justify-between m-5 md:flex-col md:items-start gap-y-3 ">
              <div className="text-lg font-semibold">
                <Skeleton className="w-[85px] h-[24px] bg-gray-200" />
              </div>
              <div className="flex items-center justify-center">
                <Skeleton className="w-[107.45px] h-[42px] bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProductCardSkeleton;
