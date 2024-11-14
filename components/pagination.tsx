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

  return (
    <>
      <button
        type="button"
        disabled={page === 1}
        onClick={() => {
          if (page === 1) {
            return;
          }

          router.push(`${pathname}?page=${page - 1}&size=${size}`);
        }}
      >
        prev
      </button>
      <button
        type="button"
        onClick={() => {
          if (page === totalCount) {
            return;
          }

          router.push(`${pathname}?page=${page + 1}&size=${size}`);
        }}
      >
        next
      </button>
    </>
  );
};

export default Pagination;
