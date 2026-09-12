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

export const MOCK_CARS: Car[] = [
  {
    id: 'e58adcfb-4b16-413d-9380-52a025a66db2',
    year: 2020,
    brand: 'Kia',
    model: 'Rio',
    type: 'Sedan, Hatchback',
    img: 'https://ac.goit.global/car-rental-task/9630-ai.jpg',
    description:
      'The Kia Rio is a versatile and fuel-efficient vehicle available in both sedan and hatchback body styles, offering a comfortable cabin, modern features, and a smooth driving experience, making it an attractive choice for urban commuters.',
    fuelConsumption: 6.2,
    engine: '1.6L 4-cylinder',
    rentalPrice: '50',
    rentalCompany: 'Economy Car Rentals',
    rentalConditions: [
      'Minimum age: 21',
      "Valid driver's license",
      'Security deposit and insurance required',
    ],
    mileage: 6234,
    stockNumber: 6240,
    features: [
      'Apple CarPlay and Android Auto integration',
      'Smart Key with Push Button Start',
      'Automatic climate control',
      'Front-Wheel Drive',
      'Electronic Stability Control',
      'Rearview camera',
    ],
    location: {
      country: 'Ukraine',
      city: 'Kharkiv',
      address: '321 Example Lane',
    },
    createdAt: '2026-02-16T22:00:36.188Z',
    updatedAt: '2026-02-16T22:00:39.547Z',
  },
  {
    id: 'e8272785-e241-4d70-b7f2-964bd083756c',
    year: 2020,
    brand: 'Land Rover',
    model: 'Range Rover Sport',
    type: 'SUV',
    img: 'https://ac.goit.global/car-rental-task/9618-ai.jpg',
    description:
      'The Land Rover Range Rover Sport is a premium SUV that offers a perfect blend of luxury, off-road capability, and dynamic performance, providing a refined driving experience both on and off the road.',
    fuelConsumption: 11.8,
    engine: '3.0L V6',
    rentalPrice: '80',
    rentalCompany: 'Luxury SUV Rentals',
    rentalConditions: [
      'Minimum age: 25',
      "Valid driver's license",
      'Security deposit and insurance required',
    ],
    mileage: 4856,
    stockNumber: 7973,
    features: [
      'Premium Windsor leather seats',
      'Meridian surround sound system',
      'Adaptive Dynamics suspension',
      'All-Wheel Drive',
      'Terrain Response 2 system',
      'Power-operated gesture tailgate',
    ],
    location: {
      country: 'Ukraine',
      city: 'Lviv',
      address: '654 Example Street',
    },
    createdAt: '2026-02-16T22:00:36.187Z',
    updatedAt: '2026-02-16T22:00:39.547Z',
  },
  {
    id: 'e2c6a148-a9d4-4b53-a45f-dd303005cf02',
    year: 2020,
    brand: 'Kia',
    model: 'Rio',
    type: 'Hatchback',
    img: 'https://ac.goit.global/car-rental-task/9630-ai.jpg',
    description:
      'The Kia Rio is a compact and fuel-efficient hatchback that offers a blend of affordability, reliability, and practicality, making it an excellent choice for urban commuting and everyday driving.',
    fuelConsumption: 6.2,
    engine: '1.6L 4-cylinder',
    rentalPrice: '50',
    rentalCompany: 'Economy Car Rentals',
    rentalConditions: [
      'Minimum age: 21',
      "Valid driver's license",
      'Security deposit and insurance required',
    ],
    mileage: 4618,
    stockNumber: 1808,
    features: [
      'Apple CarPlay and Android Auto integration',
      'Smart Key with Push Button Start',
      'Automatic climate control',
      'Front-Wheel Drive',
      'Electronic Stability Control',
      'Rearview camera',
    ],
    location: {
      country: 'Ukraine',
      city: 'Kharkiv',
      address: '321 Example Lane',
    },
    createdAt: '2026-02-16T22:00:36.186Z',
    updatedAt: '2026-02-16T22:00:39.545Z',
  },
  {
    id: 'd2acc02e-8c11-4c93-a7c4-ab2cd72abad6',
    year: 2020,
    brand: 'Volvo',
    model: 'XC60',
    type: 'SUV',
    img: 'https://ac.goit.global/car-rental-task/9586-ai.jpg',
    description:
      'The Volvo XC60 is a luxurious and versatile SUV that combines Scandinavian design, advanced safety features, and a comfortable driving experience, making it an ideal choice for families and adventure enthusiasts.',
    fuelConsumption: 8.5,
    engine: '2.0L 4-cylinder',
    rentalPrice: '40',
    rentalCompany: 'Premium Car Rentals',
    rentalConditions: [
      'Minimum age: 25',
      "Valid driver's license",
      'Security deposit and insurance required',
    ],
    mileage: 6618,
    stockNumber: 9991,
    features: [
      'Leather upholstery',
      'Panoramic sunroof',
      'Harman Kardon premium sound system',
      'All-Wheel Drive',
      'City Safety collision avoidance technology',
      'Power tailgate',
    ],
    location: {
      country: 'Ukraine',
      city: 'Dnipro',
      address: '987 Example Road',
    },
    createdAt: '2026-02-16T22:00:36.186Z',
    updatedAt: '2026-02-16T22:00:39.546Z',
  },
  {
    id: '3653c109-efc5-4c20-8719-8f53ab2d2fe1',
    year: 2020,
    brand: 'Chrysler',
    model: 'Voyager',
    type: 'Van/Minivan',
    img: 'https://ac.goit.global/car-rental-task/9660-ai.jpg',
    description:
      'The Chrysler Voyager is a practical and versatile van/minivan that provides comfortable seating, ample cargo space, and a range of convenient features for family-oriented transportation.',
    fuelConsumption: 8.2,
    engine: '3.6L V6',
    rentalPrice: '80',
    rentalCompany: 'Family Car Rentals',
    rentalConditions: [
      'Minimum age: 21',
      "Valid driver's license",
      'Security deposit and insurance required',
    ],
    mileage: 5807,
    stockNumber: 5762,
    features: [
      "Stow 'n Go seating",
      'Uconnect infotainment system',
      'Blind Spot Monitoring',
      'Front-Wheel Drive',
      'Electronic Stability Control',
      'Power sliding side doors',
    ],
    location: {
      country: 'Ukraine',
      city: 'Odesa',
      address: '789 Example Boulevard',
    },
    createdAt: '2026-02-16T22:00:36.185Z',
    updatedAt: '2026-02-16T22:00:39.544Z',
  },
  {
    id: '2a32cd84-759f-4e91-b24e-6ec7676129e9',
    year: 2006,
    brand: 'Mercedes-Benz',
    model: 'SLK-Class',
    type: 'Convertible',
    img: 'https://ac.goit.global/car-rental-task/9655-ai.jpg',
    description:
      'The Mercedes-Benz SLK-Class is a luxurious and sporty convertible that offers a perfect balance of style, performance, and refinement, delivering an enjoyable open-top driving experience.',
    fuelConsumption: 9.8,
    engine: '3.5L V6',
    rentalPrice: '80',
    rentalCompany: 'Luxury Car Rentals',
    rentalConditions: [
      'Minimum age: 25',
      "Valid driver's license",
      'Security deposit and insurance required',
    ],
    mileage: 6280,
    stockNumber: 3460,
    features: [
      'Airscarf neck-level heating',
      'Harman Kardon surround sound system',
      'Magic Sky Control panoramic roof',
      'Rear-Wheel Drive',
      'Dynamic Stability Control',
      'Retractable hardtop roof',
    ],
    location: {
      country: 'Ukraine',
      city: 'Kyiv',
      address: '456 Example Avenue',
    },
    createdAt: '2026-02-16T22:00:36.184Z',
    updatedAt: '2026-02-16T22:00:39.544Z',
  },
  {
    id: 'ce7f8759-12d6-4bd5-8355-ba19ec00fe8a',
    year: 1998,
    brand: 'Chevrolet',
    model: 'Camaro',
    type: 'Convertible',
    img: 'https://ac.goit.global/car-rental-task/9655-ai.jpg',
    description:
      'The Chevrolet Camaro is an American muscle car legend with a rich heritage, boasting aggressive styling, powerful engines, and exhilarating performance.',
    fuelConsumption: 13.5,
    engine: '5.7L V8',
    rentalPrice: '80',
    rentalCompany: 'Muscle Car Rentals',
    rentalConditions: [
      'Minimum age: 25',
      "Valid driver's license",
      'Security deposit and insurance required',
    ],
    mileage: 6330,
    stockNumber: 9055,
    features: [
      'Leather upholstery',
      'Bose premium sound system',
      'Performance suspension',
      'Rear-Wheel Drive',
      'Limited-slip differential',
      'Power-operated convertible top',
    ],
    location: {
      country: 'Ukraine',
      city: 'Lviv',
      address: '123 Example Street',
    },
    createdAt: '2026-02-16T22:00:36.168Z',
    updatedAt: '2026-02-16T22:00:39.543Z',
  },
  {
    id: '95a501ad-3d21-4300-a188-8175c495e1b2',
    year: 2001,
    brand: 'BMW',
    model: 'Z8',
    type: 'Convertible',
    img: 'https://ac.goit.global/car-rental-task/9634-ai.jpg',
    description:
      'The BMW Z8 is a classic and timeless convertible that combines iconic retro-inspired design, outstanding performance, and luxurious comfort.',
    fuelConsumption: 14.2,
    engine: '4.9L V8',
    rentalPrice: '80',
    rentalCompany: 'Classic Car Rentals',
    rentalConditions: [
      'Minimum age: 25',
      "Valid driver's license",
      'Security deposit and proof of insurance required',
    ],
    mileage: 5990,
    stockNumber: 2732,
    features: [
      'Aluminum space frame',
      'Nappa leather upholstery',
      'Harman Kardon audio system',
      'Rear-Wheel Drive',
      'Dynamic Stability Control',
      'Power-operated soft-top roof',
    ],
    location: {
      country: 'Ukraine',
      city: 'Zaporizhzhia',
      address: '654 Example Circle',
    },
    createdAt: '2026-02-16T22:00:36.162Z',
    updatedAt: '2026-02-16T22:00:39.542Z',
  },
  {
    id: '2c3945a6-d4d7-4071-bff2-5ab4a79e8fba',
    year: 2011,
    brand: 'Audi',
    model: 'A5',
    type: 'Convertible',
    img: 'https://ac.goit.global/car-rental-task/9631-ai.jpg',
    description:
      'The Audi A5 is a stylish and refined convertible that offers a perfect blend of elegance, cutting-edge technology, and exhilarating driving dynamics.',
    fuelConsumption: 8.5,
    engine: '2.0L Inline-4',
    rentalPrice: '80',
    rentalCompany: 'Luxury Car Rentals',
    rentalConditions: [
      'Minimum age: 25',
      "Valid driver's license",
      'Security deposit and insurance required',
    ],
    mileage: 4635,
    stockNumber: 6841,
    features: [
      'Bang & Olufsen 3D sound system',
      'Audi Virtual Cockpit',
      'Audi Drive Select',
      'Front-Wheel Drive',
      'Quattro all-wheel drive available',
      'Power-folding acoustic soft-top',
    ],
    location: {
      country: 'Ukraine',
      city: 'Dnipro',
      address: '987 Example Lane',
    },
    createdAt: '2026-02-16T22:00:36.159Z',
    updatedAt: '2026-02-16T22:00:39.541Z',
  },
  {
    id: '3cd1a85c-f575-43ba-99b0-d8198e5d7493',
    year: 2009,
    brand: 'Lamborghini',
    model: 'Murcielago',
    type: 'Convertible',
    img: 'https://ac.goit.global/car-rental-task/9629-ai.jpg',
    description:
      'The Lamborghini Murcielago is an exotic and high-performance convertible that represents the epitome of Italian automotive engineering, combining breathtaking design, blistering speed, and a spine-tingling exhaust note.',
    fuelConsumption: 25,
    engine: '6.5L V12',
    rentalPrice: '80',
    rentalCompany: 'Supercar Rentals',
    rentalConditions: [
      'Minimum age: 30',
      "Valid driver's license",
      'Security deposit and insurance required',
    ],
    mileage: 5832,
    stockNumber: 6410,
    features: [
      'Carbon-fiber body panels',
      'Alcantara upholstery',
      'Lamborghini Infotainment System',
      'All-Wheel Drive',
      'Electronic Stability Control',
      'Retractable soft-top roof',
    ],
    location: {
      country: 'Ukraine',
      city: 'Kharkiv',
      address: '321 Example Road',
    },
    createdAt: '2026-02-16T22:00:36.157Z',
    updatedAt: '2026-02-16T22:00:39.541Z',
  },
];
