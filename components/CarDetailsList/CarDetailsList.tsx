import type { IconType } from 'react-icons';
import css from './CarDetailsList.module.css';

interface CarDetailItem {
  icon: IconType;
  text: string;
}

interface CarDetailListProps {
  title: string;
  items: CarDetailItem[];
}

export default function CarDetailsList({ title, items }: CarDetailListProps) {
  return (
    <div className={css.carDetailsListWrapper}>
      <h3 className='title3'>{title}</h3>
      <ul className={css.carDetailsList}>
        {items.map((item, index) => (
          <li key={index} className={css.carDetailsListItem}>
            <item.icon className={css.icon} aria-hidden />
            <span className='bodyMd'>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
