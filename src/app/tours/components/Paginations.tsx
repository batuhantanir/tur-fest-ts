import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';

function Paginations({
  isLoading,
  products,
  offset,
  limit,
  searchQuery,
  totalProductsCount,
  isMobile,
}: {
  isLoading: boolean;
  products: any;
  offset: any;
  limit: any;
  searchQuery: string;
  totalProductsCount: any;
  isMobile: boolean;
}) {
  return (
    <>
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
                            (item: any) =>
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
                        (item: any) =>
                          !item.includes('limit') && !item.includes('offset')
                      )
                      .join('&')}`}
                  >
                    {offset / limit}
                  </PaginationLink>
                )}
                <PaginationLink href="#">{offset / limit + 1}</PaginationLink>
                {offset + limit < Number(totalProductsCount) && !isMobile && (
                  <PaginationLink
                    href={`/tours?limit${limit}&&offset=${
                      offset + limit
                    }&${searchQuery
                      .split('&')
                      .filter(
                        (item) =>
                          !item.includes('limit') && !item.includes('offset')
                      )
                      .join('&')}`}
                  >
                    {offset / limit + 2}
                  </PaginationLink>
                )}
              </PaginationItem>
              {!isMobile && (
                <PaginationItem>
                  {offset + 2 * limit < Number(totalProductsCount) && (
                    <PaginationEllipsis />
                  )}
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  href={
                    offset + limit < Number(totalProductsCount)
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
                    !(offset + limit < Number(totalProductsCount)) &&
                    'pointer-events-none text-black/50 hover:text-black/50'
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ))}
    </>
  );
}

export default Paginations;
