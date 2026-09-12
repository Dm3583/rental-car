'use client';

import type { Car } from '@/types/car';
import css from './CatalogList.module.css';
import CarCard from '../CarCard/CarCard';

interface CatalogListProps {
  carList: Car[];
}

export default function CatalogList({ carList }: CatalogListProps) {
  return (
    <ul className={css.list}>
      {carList.map((car) => (
        <li key={car.id}>
          <CarCard car={car} />
        </li>
      ))}
    </ul>
  );
}
