// import { useState } from 'react';
import Image from 'next/image';
import ButtonLink from '@/components/ButtonLink/ButtonLink';
import FilterBar from '@/components/FilterBar/FilterBar';
import css from './page.module.css';



export default function Home() {

  return (
    <div>
      <section className={css.hero}>
        <Image
          className={css.heroImage}
          src='/HeroImage.webp'
          alt='Convertible parked on a coastal road'
          fill
          sizes='(max-width: 1440px) 100vw, 1440px'
          priority
        />
        <div className={css.heroContent}>
          <h1 className={css.title}>Find your perfect rental car</h1>
          <p className={css.description}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <ButtonLink href='/catalog' label='View Catalog' maxWidth={276} />
        </div>
      </section>
      <FilterBar />
    </div>
  );
}
