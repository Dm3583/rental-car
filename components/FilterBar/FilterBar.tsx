'use client';

import { useState } from 'react';
import styles from './FilterBar.module.css';
import CustomDropdown from '@/components/CustomDropdown/CustomDropdown';
import CustomRange from '../CustomRange/CustomRange';
import Button from '../Button/Button';
import { getPriceOptions, toDigits, toNumberOrUndefined } from '@/lib/utils';
import { FILTER_FIELDS, FilterField, Filters, FilterValue } from '@/types/car';

interface FilterBarProps {
  filters: Filters;
  /** Starting values, taken from the URL. */
  initialValue?: FilterValue;
  onSearch: (filterValue: FilterValue) => void;
}

const MILAGE_ERROR_MESSAGE = '"From" must not be greater than "To"';

export default function FilterBar({
  filters,
  initialValue = {},
  onSearch,
}: FilterBarProps) {
  const [filterValue, setFilterValue] = useState<FilterValue>(initialValue);
  // Set by a blocked Search so the mileage message shows even if focus is still in the range.
  const [isMileageErrorForced, setIsMileageErrorForced] = useState(false);

  const handleFilterChange = (name: FilterField, value: string) => {
    setFilterValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleMileageChange = (name: FilterField, raw: string) => {
    setIsMileageErrorForced(false);
    handleFilterChange(name, toDigits(raw));
  };

  const brandOptions = filters.brands.map((brand) => ({
    value: brand,
    label: brand,
  }));

  const priceOptions = getPriceOptions(filters.price);

  const minMileage = toNumberOrUndefined(filterValue.minMileage ?? '');
  const maxMileage = toNumberOrUndefined(filterValue.maxMileage ?? '');
  const mileageError =
    minMileage !== undefined &&
    maxMileage !== undefined &&
    minMileage > maxMileage
      ? MILAGE_ERROR_MESSAGE
      : undefined;

  const handleSearch = () => {
    if (mileageError) {
      setIsMileageErrorForced(true);
      return;
    }
    onSearch(filterValue);
  };

  const handleReset = () => {
    setFilterValue({});
    setIsMileageErrorForced(false);
    onSearch({});
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterBarRaw}>
        <CustomDropdown
          options={brandOptions}
          label='Car brand'
          name={FILTER_FIELDS.brand}
          placeholder='Choose a brand'
          resetLabel='All brands'
          maxWidth='204px'
          onChange={handleFilterChange}
          value={filterValue.brand}
        />

        <CustomDropdown
          options={priceOptions}
          label='Price/ 1 hour'
          name={FILTER_FIELDS.price}
          placeholder='Choose a price'
          resetLabel='All prices'
          maxWidth='196px'
          onChange={handleFilterChange}
          value={filterValue.price}
          valuePrefix='To $'
        />

        <CustomRange
          label='Car mileage / km'
          valueFrom={filterValue.minMileage}
          valueTo={filterValue.maxMileage}
          maxWidth='320px'
          error={mileageError}
          forceShowError={isMileageErrorForced}
          onChangeFrom={(e) =>
            handleMileageChange(FILTER_FIELDS.minMileage, e.target.value)
          }
          onChangeTo={(e) =>
            handleMileageChange(FILTER_FIELDS.maxMileage, e.target.value)
          }
        />

        <Button label='Search' onClick={handleSearch} maxWidth={156} />
      </div>
      <div className={styles.filterBarRaw}>
        <button
          type='button'
          onClick={handleReset}
          className={styles.resetButton}
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
