import Image from 'next/image';
import css from './EmptyListState.module.css';

interface EmptyListStateProps {
  title: string;
  description?: string;
  /** Illustration above the text; pass null to show text only. */
  imageSrc?: string | null;
}

const EmptyListState = ({
  title,
  description,
  imageSrc = '/noCars.svg',
}: EmptyListStateProps) => {
  return (
    <div className={css.emptyListState} role='status'>
      {imageSrc && (
        <Image
          className={css.heroImage}
          src={imageSrc}
          alt=''
          width={414}
          height={388}
        />
      )}
      <p className={`${css.title} title2`}>{title}</p>
      {description && (
        <p className={`${css.description} bodyMd`}>{description}</p>
      )}
    </div>
  );
};

export default EmptyListState;
