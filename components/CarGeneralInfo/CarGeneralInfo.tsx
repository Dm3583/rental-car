import { CarLocation } from '@/types/car';
import { BsGeoAlt } from 'react-icons/bs';
import css from './CarGeneralInfo.module.css';

interface CarGeneralInfoProps {
  brand: string;
  model: string;
  year: number;
  stockNumber: number;
  location: CarLocation;
  rentalPrice: string;
  description: string;
}

export default function CarGeneralInfo({
  brand,
  model,
  year,
  rentalPrice,
  location,
  description,
  stockNumber,
}: CarGeneralInfoProps) {
  return (
    <div className={css.carGeneralInfo}>
      <h2 className={`${css.title} title2`}>
        {brand} {model}, {year}
        <span className={`${css.stockNumber} bodyMd`}>
          Article: {stockNumber}
        </span>
      </h2>
      <p className={`${css.location} bodyMd`}>
        <BsGeoAlt /> <span>{location.country}, {location.city}</span>
      </p>
      <p className={`${css.rentalPrice} title2`}>
        <span>${rentalPrice}</span>
      </p>
      <p className={`${css.description} bodyMd`}>{description}</p>
    </div>
  );
}
