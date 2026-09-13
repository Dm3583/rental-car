'use client';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { carDetailsQueryOptions } from '@/lib/queryOptions';
import CarGeneralInfo from '@/components/CarGeneralInfo/CarGeneralInfo';
import CarDetailsList from '@/components/CarDetailsList/CarDetailsList';
import LoadingOverlay from '@/components/LoadingOverlay/LoadingOverlay';
import Divider from '@/components/Divider/Divider';
import { RentForm } from '@/components/RentalForm/RentForm';
import { BsCalendar2Week } from 'react-icons/bs';
import { BsCarFront } from 'react-icons/bs';
import { BsFuelPump } from 'react-icons/bs';
import { BsGear } from 'react-icons/bs';
import { PiRoadHorizon } from 'react-icons/pi';
import { BsCheckCircle } from 'react-icons/bs';
import css from './CarDetails.module.css';

export default function CarDetailsClient() {
  const { carId } = useParams<{ carId: string }>();

  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    ...carDetailsQueryOptions(carId),
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <div className={css.container}>
        <LoadingOverlay title='Loading...' fullScreen />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className={`${css.container} ${css.errorWrapper}`}>
        <p>Something went wrong.</p>
      </div>
    );
  }

  const rentalConditions = car.rentalConditions.map((condition) => ({
    icon: BsCheckCircle,
    text: condition,
  }));

  const carSpecifications = [
    {
      icon: BsCalendar2Week,
      text: `Year: ${car.year}`,
    },
    {
      icon: BsCarFront,
      text: `Type: ${car.type}`,
    },
    {
      icon: BsFuelPump,
      text: `Fuel Consumption: ${car.fuelConsumption}`,
    },
    {
      icon: BsGear,
      text: `Engine: ${car.engine}`,
    },
    {
      icon: PiRoadHorizon,
      text: `Mileage: ${car.mileage}`,
    },
  ];

  const carFeatures = car.features.map((feature) => ({
    icon: BsCheckCircle,
    text: feature,
  }));

  return (
    <div className='container'>
      <div className={css.detailsWrapper}>
        <div className={css.leftBlock}>
          <Image
            className={css.carDetailsImage}
            src={car?.img}
            alt={`${car.brand} ${car.model}`}
            width={640}
            height={512}
            loading='eager'
          />
        </div>
        <div className={css.rightBlock}>
          <div className={css.infoWrapper}>
            <CarGeneralInfo
              brand={car.brand}
              model={car.model}
              year={car.year}
              rentalPrice={car.rentalPrice}
              location={car.location}
              description={car.description}
              stockNumber={car.stockNumber}
            />

            <CarDetailsList
              title='Rental Conditions:'
              items={rentalConditions}
            />
            <Divider />

            <CarDetailsList
              title='Car Specifications:'
              items={carSpecifications}
            />
            <Divider />
            <CarDetailsList title='Car Features:' items={carFeatures} />
          </div>
        </div>
        <div className={css.formWrapper}>
          <RentForm carId={carId} />
        </div>
      </div>
      <Toaster position='top-center' />
    </div>
  );
}
