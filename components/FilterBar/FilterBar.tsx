'use client';

import { useState } from 'react';
import styles from './FilterBar.module.css';
import CustomDropdown from '@/components/CustomDropdown/CustomDropdown';
import CustomRange from '../CustomRange/CustomRange';
import Button from '../Button/Button';
import { toNumberOrUndefined } from '@/lib/utils';

const TEST_OPTIONS = [
  {
    value: 'BMV',
    label: 'BMV',
  },
  { value: 'Mercedes', label: 'Mercedes' },
  { value: 'Kia', label: 'Kia' },
  { value: 'Suzuki', label: 'Suzuki' },
  { value: 'Honda', label: 'Honda' },
  { value: 'Bajaj', label: 'Bajaj' },
  { value: 'KTM', label: 'KTM' },
  { value: 'Kawasaki', label: 'Kawasaki' },
  { value: 'Husquarna', label: 'Husquarna' },
  { value: 'Lifan', label: 'Lifan' },
  { value: 'Saturn', label: 'Saturn' },
  { value: 'Dacia', label: 'Dacia' },
  { value: 'Renault', label: 'Renault' },
];

const TEST_PRICE = [
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '30', label: '30' },
  { value: '40', label: '40' },
];

interface FilterValue {
  brand?: string;
  price?: string;
  milageFrom?: number;
  milageTo?: number;
}

export default function FilterBar() {
  const [filterValue, setFilterValue] = useState<FilterValue>({});
  const onFilterChange = (name: string, value: string) => {
    setFilterValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    console.log(filterValue);
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterBarRaw}>
        <CustomDropdown
          options={TEST_OPTIONS}
          label='Car brand'
          name='brand'
          placeholder='Choose a brand'
          resetLabel='All brands'
          maxWidth='204px'
          onChange={onFilterChange}
          value={filterValue.brand}
        />

        <CustomDropdown
          options={TEST_PRICE}
          label='Price/ 1 hour'
          name='price'
          placeholder='Choose a price'
          resetLabel='All prices'
          maxWidth='196px'
          onChange={onFilterChange}
          value={filterValue.price}
          valuePrefix='To $'
        />

        <CustomRange
          label='Сar mileage / km'
          valueFrom={filterValue.milageFrom}
          valueTo={filterValue.milageTo}
          maxWidth='320px'
          onChangeFrom={(e) =>
            setFilterValue((prev) => ({
              ...prev,
              milageFrom: toNumberOrUndefined(e.target.value),
            }))
          }
          onChangeTo={(e) =>
            setFilterValue((prev) => ({
              ...prev,
              milageTo: toNumberOrUndefined(e.target.value),
            }))
          }
        />

        <Button label='Search' onClick={handleSearch} maxWidth={156} />
      </div>
      <div className={styles.filterBarRaw}>
        <button
          type='button'
          onClick={() => setFilterValue({})}
          className={styles.resetButton}
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
