'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';

const Pagination = ({
  totalCount,
  onPageChange,
}: {
  totalCount: number;
  onPageChange?: (page: number, size: number) => void;
}) => {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const { searchPage, searchSize } = useMemo(() => {
    const getSearchParam = (key: string) => Number(searchParams.get(key));

    return {
      searchPage: getSearchParam('page'),
      searchSize: getSearchParam('size'),
    };
  }, [searchParams]);

  /** return page and size as number */
  const parseParams = useCallback(() => {
    const checkFalsy = (value: number) => Number.isNaN(value) || value < 1;

    const getValidNumber = (value: number, defaultValue: number) =>
      checkFalsy(value) ? defaultValue : value;

    return {
      page: getValidNumber(searchPage, 1),
      size: getValidNumber(searchSize, 5),
    };
  }, [searchPage, searchSize]);

  const { page, size } = parseParams();

  useEffect(() => {
    if (searchPage !== page || searchSize !== size) {
      router.push(`${pathname}?page=${page}&size=${size}`);
      return;
    }

    onPageChange?.(page, size);
  }, [page, pathname, router, searchPage, searchSize, size, onPageChange]);

  const { isPrevDisabled, isNextDisabled } = useMemo(() => {
    return {
      isPrevDisabled: page === 1,
      isNextDisabled: page * size >= totalCount,
    };
  }, [page, size, totalCount]);

  return (
    <section className="flex justify-center gap-4 mt-6">
      <button
        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
        type="button"
        disabled={isPrevDisabled}
        onClick={() => {
          if (isPrevDisabled) {
            return;
          }

          router.push(`${pathname}?page=${page - 1}&size=${size}`);
        }}
      >
        Previous
      </button>
      <button
        className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
        type="button"
        disabled={isNextDisabled}
        onClick={() => {
          if (isNextDisabled) {
            return;
          }

          router.push(`${pathname}?page=${page + 1}&size=${size}`);
        }}
      >
        Next
      </button>
    </section>
  );
};

export default Pagination;
