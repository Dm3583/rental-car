import Image from 'next/image';
import type { Car } from '@/types/car';
import css from './CarCard.module.css';
import ButtonLink from '../ButtonLink/ButtonLink';

export type CarCardData = Pick<
  Car,
  | 'id'
  | 'img'
  | 'brand'
  | 'model'
  | 'year'
  | 'rentalPrice'
  | 'rentalCompany'
  | 'type'
  | 'mileage'
  | 'location'
>;

const CarCard = ({ car }: { car: CarCardData }) => {
  return (
    <div className={css.card}>
      <div className={css.carInfo}>
        <Image
          className={css.cardImage}
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          width={244}
          height={268}
        />

        <div className={`${css.modelDescription} bodyMd`}>
          <p className={css.brandModel}>
            {car.brand} <span className={css.model}>{car.model}</span>,{' '}
            {car.year}
          </p>
          <p className={css.price}>${car.rentalPrice}</p>
        </div>

        <div className={`${css.locationTypeWrapper} bodySm`}>
          <p className={css.location}>
            <span>{car.location.city}</span>
            <span>{car.location.country}</span>
            <span>{car.rentalCompany}</span>
          </p>

          <p className={css.type}>
            <span>{car.type}</span>
            <span>{car.mileage}</span>
          </p>
        </div>
      </div>

      <ButtonLink href={`/catalog/${car.id}`} label='Read More' newTab />
    </div>
  );
};

export default CarCard;
