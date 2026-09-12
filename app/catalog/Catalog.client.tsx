'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  keepPreviousData,
  useSuspenseQuery,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { FilterValue } from '@/types/car';
import FilterBar from '@/components/FilterBar/FilterBar';
import CatalogList from '@/components/CatalogList/CatalogList';
import EmptyListState from '@/components/EmptyListState/EmptyListState';
import LoadingOverlay from '@/components/LoadingOverlay/LoadingOverlay';
import css from './CatalogPage.module.css';
import {
  carsInfiniteQueryOptions,
  filtersQueryOptions,
} from '@/lib/queryOptions';
import Button from '@/components/Button/Button';
import { filtersFromSearchParams, filtersToSearchParams } from '@/lib/utils';

const CatalogClient = () => {
  const { data: filters } = useSuspenseQuery(filtersQueryOptions);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const appliedFilters = filtersFromSearchParams(searchParams);

  const handleSearch = (filterValue: FilterValue) => {
    const query = filtersToSearchParams(filterValue).toString();

    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleResetFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const {
    data: cars,
    status,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isPlaceholderData,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...carsInfiniteQueryOptions(appliedFilters),
    placeholderData: keepPreviousData,
  });

  const carList = cars?.pages.flatMap((page) => page.cars) ?? [];

  const isEmpty =
    status === 'success' && !isPlaceholderData && carList.length === 0;

  const isCarsLoading = isLoading || isPlaceholderData || isFetchingNextPage;

  const isError = status === 'error';

  return (
    <div className={css.catalogClientWrapper}>
      <div className={css.filterWrapper}>
        <FilterBar
          key={searchParams.toString()}
          filters={filters}
          initialValue={appliedFilters}
          onSearch={handleSearch}
        />
      </div>
      <div aria-busy={isCarsLoading}>
        <div inert={isCarsLoading}>
          {isError ? (
            <>
              <EmptyListState
                imageSrc={null}
                title='Something went wrong'
                description="We couldn't load the cars. Check your connection and try again."
              />
              <div className={css.resetFiltersBtnWrapper}>
                <Button
                  type='button'
                  variant='outlined'
                  maxWidth={156}
                  onClick={() => refetch()}
                  label='Try again'
                />
              </div>
            </>
          ) : isEmpty ? (
            <>
              <EmptyListState
                title='No cars found'
                description="We couldn't find any cars that match your current filters. Try changing your search criteria or reset the filters."
              />
              <div className={css.resetFiltersBtnWrapper}>
                <Button
                  type='button'
                  variant='outlined'
                  maxWidth={156}
                  onClick={handleResetFilters}
                  label='Reset filters'
                />
              </div>
            </>
          ) : (
            <div className={css.catalogListWrapper}>
              <CatalogList carList={carList} />
            </div>
          )}
        </div>
        {isCarsLoading && (
          <LoadingOverlay
            title='Loading cars...'
            description='Please wait while we fetch the best cars for you'
          />
        )}
      </div>
      <div className={css.loadMoreBtnWrapper}>
        {hasNextPage && (
          <Button
            type='button'
            variant='outlined'
            maxWidth={156}
            onClick={() => fetchNextPage()}
            disabled={isPlaceholderData || isFetchingNextPage}
            label={isFetchingNextPage ? 'Loading...' : 'Load More'}
          />
        )}
      </div>
    </div>
  );
};

export default CatalogClient;
