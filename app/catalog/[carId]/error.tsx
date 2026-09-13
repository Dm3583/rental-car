'use client';

import css from './CarDetails.module.css';

type Props = {
  error: Error;
};

const CarDetailsError = ({ error }: Props) => (
  <div className='container'>
    <div className={css.errorWrapper}>
      <p>Could not fetch car details. {error.message}</p>
    </div>
  </div>
);

export default CarDetailsError;
