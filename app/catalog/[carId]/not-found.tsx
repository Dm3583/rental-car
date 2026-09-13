import ButtonLink from '@/components/ButtonLink/ButtonLink';
import css from './CarDetails.module.css';

export default function NotFound() {
  return (
    <div className='container'>
      <div className={css.errorWrapper}>
        <p className='title2'>Car not found</p>
        <ButtonLink href='/catalog' label='Back to Catalog' maxWidth={180} />
      </div>
    </div>
  );
}
